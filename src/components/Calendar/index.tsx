import React from 'react';

import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateCallbackHandler,
} from 'react-native-calendars';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { ptBr } from './localeConfig';
import { generateInterval } from './generateInterval';

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface Props {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

interface DayProps {
  dateString: string;
  day: number;
  mounth: number;
  year: number;
  timestamp: string;
}

function Calendar({ markedDates, onDayPress }: Props) {
  const { colors, fonts } = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          color={colors.text}
          size={24}
        />
      )}
      headerStyle={{
        backgroundColor: colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.text_details,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: fonts.primary_400,
        textDayHeaderFontFamily: fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { Calendar, DayProps, MarkedDateProps, generateInterval };
