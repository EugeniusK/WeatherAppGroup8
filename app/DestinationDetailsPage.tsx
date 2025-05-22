import React from "react";
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient, Path, Stop } from "react-native-svg";

class CustomLineChart extends LineChart {
  renderLine = ({
    width,
    height,
    paddingRight,
    paddingTop,
    data,
  }: Pick<
    AbstractChartConfig,
    "data" | "width" | "height" | "paddingRight" | "paddingTop" 
  >) => {
    const output: React.JSX.Element[] = [];

    if(!data) return []

    data.forEach((dataset, index) => {
      const bezierPoints = this.getBezierLinePoints(dataset, {
        width,
        height,
        paddingRight,
        paddingTop,
        data
      });

      const gradientColors = ["#F10086", "#3F00F1"];

      output.push(
        <LinearGradient
          key={`line-gradient-${index}`}
          id={`line-gradient-${index}`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop offset="0%" stopColor={gradientColors[0]} />
          <Stop offset="100%" stopColor={gradientColors[1]} />
        </LinearGradient>,
        <Path
          key={`line-${index}`}
          d={bezierPoints}
          fill="none"
          stroke={`url(#line-gradient-${index})`} 
          strokeWidth={this.getStrokeWidth(dataset)}
          strokeDasharray={dataset.strokeDashArray}
          strokeDashoffset={dataset.strokeDashOffset}
        />
      );
    });

    return output;
  };
}

export default function DestinationDetailsPage() {


  return <SafeAreaProvider><SafeAreaView>
    <CustomLineChart data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            data: [12.3,11.5,10.7,10.3,9.4,9.4,10.4,11.1,12.2,12.6,13.5,13.7,15.0,15.7,15.4,14.8,13.6,13.2,11.6,10.6,9.9,9.2,8.7,8.2,7.4,7.0,6.8,6.5,6.5,7.0,7.9,9.3,10.6,11.8,12.9,13.9,13.9,14.4,12.9,14.0,11.1,12.2,12.1,11.9,11.0,10.4,9.7,9.0,8.5,8.3,8.1,8.1,7.9,8.1,8.8,9.9,11.7,12.9,14.0,15.5,16.3,16.9,17.6,18.0,18.1,17.9,17.2,16.2,15.0,14.2,13.6,13.3,12.9,12.5,12.2,11.9,11.4,11.2,11.1,11.9,12.5,12.9,12.9,14.2,15.3,15.3,15.0,14.8,15.0,15.3,15.4,15.1,14.6,14.1,14.0,13.9,13.8,13.5,13.2,13.0,13.1,13.4,14.1,15.4,17.2,18.6,19.4,19.9,20.1,20.2,20.1,19.7,18.9,17.7,16.6,15.5,14.3,13.4,12.6,12.1,11.5,10.7,9.9,9.6,10.1,11.2,11.9,14.1,15.6,16.9,17.8,18.4,19.0,19.5,19.9,20.0,19.9,19.6,19.0,18.0,16.7,15.6,14.8,14.1,13.6,13.0,12.5,12.3,12.7,13.4,14.2,15.1,16.0,16.6,16.8,16.7,16.7,16.9,17.1,17.2,17.2,17.1,16.9,16.5,15.9,15.4,15.1,14.8],
          },
        ],
      }}
      width={350}
      height={250}
      chartConfig={{
        backgroundGradientFrom: '#fbfbfb',
        backgroundGradientTo: '#fbfbfb',
        color: (opacity = 1) => 'url(#grad)',
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      bezier
      withInnerLines={false}
      withOuterLines={false}
/>
    
    </SafeAreaView></SafeAreaProvider>
}

///https://stackoverflow.com/a/63988530
