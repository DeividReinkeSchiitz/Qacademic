import { useRoute } from '@react-navigation/native';
import React, { useReducer, useState } from 'react';
import { Animated, View, Dimensions, Linking } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';

import { colors } from '../../common';
import Container from '../../common/components/container/Container';
import TopButtonsNavigator from '../../common/components/topButtonsNavigator/TopButtonsNavigator';
import { materialValueI } from '../../common/types';
import {
  ClassTitle,
  Slider,
  sliderShadow,
  ObsTitle,
  ObsText,
  PublicationData,
  Button,
  ButtonView,
  ButtonText,
  SliderHeader,
} from './styles';

const { width } = Dimensions.get('screen');

const ClassMaterialScreen: React.FC = () => {
  const year = useRoute().name;
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const classesMaterialEntries = useSelector((state: any) => {
    const classMaterial = state.student.classMaterial;
    return Object.entries(classMaterial[year + '/1']);
  }) as [string, materialValueI[]][];

  const [currentSliderIndex, setCurrentSliderIndex] = useState(
    new Array<number>(classesMaterialEntries.length)
  );
  const [scrollY] = useState(new Animated.Value(10));

  const scrollYInterpolated = scrollY.interpolate({
    inputRange: [0, 220],
    outputRange: [10, -220],
    extrapolate: 'clamp',
  });
  const scrollYInversed = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });

  const downloadButton = async (uri: string) => {
    await Linking.openURL(uri);
  };
  const _renderItem = ({
    item,
    index,
  }: {
    item: materialValueI;
    index: number;
  }) => {
    return (
      <Slider style={sliderShadow}>
        <SliderHeader>
          <ObsTitle>Observação: </ObsTitle>
        </SliderHeader>
        <ObsText>{item.obs}</ObsText>
        <PublicationData>{item.publicationData}</PublicationData>

        <Button onPress={() => downloadButton(item.material)}>
          <ButtonView>
            <ButtonText>Download</ButtonText>
          </ButtonView>
        </Button>
      </Slider>
    );
  };

  const pagination = (value: any, index: number) => {
    return (
      <Pagination
        activeDotIndex={currentSliderIndex[index] | 0}
        dotsLength={value[1].length}
        containerStyle={{ paddingVertical: 8 }}
        dotColor={colors.Greenprimary}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          marginHorizontal: 8,
        }}
        inactiveDotColor="#000"
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  return (
    <Container>
      <TopButtonsNavigator
        selected="ClassMaterialScreen"
        scrollY={scrollYInterpolated}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        style={{
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: scrollYInversed,
              },
            ],
            marginTop: 15,
            flex: 1,
          }}
        >
          {classesMaterialEntries.map((value, index) => (
            <View key={index}>
              <ClassTitle>{value[0]}</ClassTitle>
              <Carousel
                layout="default"
                data={value[1]}
                sliderWidth={width - 50}
                itemWidth={width - 150}
                renderItem={_renderItem}
                hasParallaxImages
                inactiveSlideScale={0.85}
                inactiveSlideOpacity={0.95}
                shouldOptimizeUpdates
                activeAnimationType="spring"
                onSnapToItem={(i) => {
                  let time;
                  clearTimeout(time);

                  const value = currentSliderIndex;
                  value[index] = i;
                  setCurrentSliderIndex(value);

                  time = setTimeout(() => {
                    forceUpdate();
                  }, 300);
                }}
                loopClonesPerSide={2}
                maxToRenderPerBatch={3}
              />
              {pagination(value, index)}
            </View>
          ))}
        </Animated.View>
      </Animated.ScrollView>
    </Container>
  );
};

export default ClassMaterialScreen;
