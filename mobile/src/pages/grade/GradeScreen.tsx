import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ScrollView, Animated, View } from 'react-native';
import { useSelector } from 'react-redux';

import Container from '../../common/components/container/Container';
import TopButtonsNavigator from '../../common/components/topButtonsNavigator/TopButtonsNavigator';
import { studentI, twoMonthI } from '../../common/types';
import {
  EspecificGrade,
  WhiteBar,
  GreenBar,
  Row,
  ClassTitle,
  GradeText,
  Icon,
  Button,
  meanHeader,
} from './styles';

const getMean = (especificGrades: twoMonthI[]) => {
  let mean = 0;
  let count = 0;

  for (let index = 0; index < especificGrades.length; index++) {
    const element = especificGrades[index];

    if (element.concept && element.grade) {
      mean += element.concept + element.grade * 0.8;
      count++;
    }
  }
  mean /= count;
  if (isNaN(mean)) {
    mean = 0;
  }
  return parseFloat(mean.toFixed(2));
};

const GradeScreen = () => {
  const student = useSelector<{ student: studentI }>(
    (state) => state.student
  ) as studentI;

  const grades = student.grades;
  const [scrollY] = useState(new Animated.Value(10));

  const year = useRoute().name;
  const navigation = useNavigation();

  const buttonPressed = (
    grades: twoMonthI[],
    mean: number,
    className: string
  ) => {
    navigation.navigate('EspecificGradeScreen', {
      grades,
      mean,
      className,
    });
  };

  const _renderScrollViewContent = () => {
    return Object.entries(grades[year]).map((value, index) => {
      const className = value[0];
      const especificGrades = value[1];
      const mean = getMean(especificGrades);

      return (
        <EspecificGrade key={index}>
          <Row>
            <ClassTitle>{className}</ClassTitle>
            <Button
              onPress={() => buttonPressed(especificGrades, mean, className)}
              background={Button.Ripple('#ccc', true)}
            >
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <GradeText>{mean}</GradeText>
                <Icon />
              </View>
            </Button>
          </Row>
          <WhiteBar>
            <GreenBar grade={mean} />
          </WhiteBar>
        </EspecificGrade>
      );
    });
  };

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

  return (
    <Container>
      <TopButtonsNavigator
        selected="GradeScreen"
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
      >
        <Animated.View
          style={{
            transform: [
              {
                translateY: scrollYInversed,
              },
            ],
            marginTop: 15,
          }}
        >
          {_renderScrollViewContent()}
        </Animated.View>
      </Animated.ScrollView>
    </Container>
  );
};

export default GradeScreen;
