import { useRoute, RouteProp } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

import { colors } from '../../common';
import Container from '../../common/components/container/Container';
import { twoMonthI } from '../../common/types';
import {
  GradientContainer,
  MeanText,
  Description,
  ClassName,
  LandingBackground,
  TopHeader,
  GradeContainer,
  Scroll,
  Table,
  TableAttrText,
  TableAttrValue,
  TableRow,
  TableTitle,
  tableShadowStyle,
  MeanHeader,
} from './styles';
interface currentGradeI {
  mean: number;
  grades: twoMonthI[];
  className: string;
}

const EspecificGrade: React.FC = () => {
  const route = useRoute<
    RouteProp<Record<string, currentGradeI | undefined>, string>
  >();

  const grades = route.params?.grades;
  const mean = route.params?.mean;
  const className = route.params?.className;

  const __renderTableComponets = () => {
    return grades?.map((value, index) => {
      const { missedClasses, grade, concept } = value;

      return (
        <Table style={{ ...tableShadowStyle }} key={index}>
          <TableTitle>Bimestre {index + 1}</TableTitle>

          <TableRow gray={false}>
            <TableAttrText>Nota</TableAttrText>
            <TableAttrValue>{grade | 0}</TableAttrValue>
          </TableRow>

          <TableRow gray>
            <TableAttrText>Conceito</TableAttrText>
            <TableAttrValue>{concept | 0}</TableAttrValue>
          </TableRow>

          <TableRow gray={false}>
            <TableAttrText>Faltas</TableAttrText>
            <TableAttrValue>{missedClasses | 0}</TableAttrValue>
          </TableRow>

          <TableRow gray>
            <TableAttrText>Nota Final</TableAttrText>
            <TableAttrValue>
              {(grade * 0.8 + concept).toFixed(2)}
            </TableAttrValue>
          </TableRow>
        </Table>
      );
    });
  };
  return (
    <>
      <Container>
        <LandingBackground style={tableShadowStyle} />
        <TopHeader style={{ elevation: 20 }}>
          <ClassName>{className}</ClassName>
        </TopHeader>
        <Scroll showsVerticalScrollIndicator={false}>
          <MeanHeader>
            <MeanText>{mean}</MeanText>
            <Description>Média Geral</Description>
          </MeanHeader>
          <GradeContainer>{__renderTableComponets()}</GradeContainer>
        </Scroll>
      </Container>
    </>
  );
};

export default EspecificGrade;
