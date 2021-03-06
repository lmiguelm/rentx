import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { Photos } from '../../dtos/CarDTO';
import { Bullet } from '../Bullet';

import { CarImage, CarImageWrapper, Container, ImagesIndexes } from './styles';

interface Props {
  imagesUrl: Photos[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const indexChanges = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <ImagesIndexes>
        {imagesUrl.map((_, index) => (
          <Bullet key={index} active={imageIndex === index} />
        ))}
      </ImagesIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarImageWrapper>
            <CarImage key={item.id} source={{ uri: item.photo }} resizeMode="contain" />
          </CarImageWrapper>
        )}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanges.current}
      />
    </Container>
  );
}
