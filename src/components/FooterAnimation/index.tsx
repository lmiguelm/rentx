import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  children: React.ReactNode;
}

export function FooterAnimation({ children }: Props) {
  const opacity = useSharedValue(0);
  const position = useSharedValue(150);

  const footerStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: position.value,
        },
      ],
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
    position.value = withTiming(0, { duration: 1000 });
  }, []);

  return <Animated.View style={footerStyle}>{children}</Animated.View>;
}
