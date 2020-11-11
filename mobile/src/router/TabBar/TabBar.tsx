import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { colors } from '../../common';
import {
  TabContainer,
  Row,
  TabText,
  ButtonContainer,
  ButtonOpacity,
  styleShadow,
} from './styles';

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const [translateValue] = useState(new Animated.Value(0));

  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;

  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <TabContainer style={{ width: totalWidth, ...styleShadow }}>
      <Row>
        <Animated.View
          style={{
            transform: [{ translateX: translateValue }],

            width: tabWidth - 20,
            height: 5,
            position: 'absolute',
            top: 0,
            left: 10,
            right: 10,
            backgroundColor: colors.Greendark,
            borderRadius: 10,
            marginTop: 1,
          }}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }

            Animated.spring(translateValue, {
              damping: 10,
              mass: 1,
              stiffness: 100,
              overshootClamping: false,
              restSpeedThreshold: 0.001,
              restDisplacementThreshold: 0.001,
              toValue: tabWidth * index,
            }).start();
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <ButtonOpacity
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityState={{ selected: isFocused }}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index}
            >
              <ButtonContainer>
                <TabText
                  style={{
                    color: isFocused ? '#fff' : 'rgba(255, 255, 255, 0.66)',
                  }}
                >
                  {label}
                </TabText>
              </ButtonContainer>
            </ButtonOpacity>
          );
        })}
      </Row>
    </TabContainer>
  );
};

export default TabBar;
