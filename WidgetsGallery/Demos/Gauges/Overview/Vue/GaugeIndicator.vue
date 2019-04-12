<template>
  <dx-circular-gauge :value="value">
    <dx-size
      :width="90"
      :height="90"
    />
    <dx-value-indicator color="#f05b41"/>
    <dx-geometry
      :start-angle="startAngle"
      :end-angle="endAngle"
    />
    <dx-scale
      :start-value="!inverted ? 0 : 100"
      :end-value="!inverted ? 100 : 0"
      :tick-interval="10"
    />
  </dx-circular-gauge>
</template>
<script>

import DxCircularGauge, {
  DxSize,
  DxValueIndicator,
  DxGeometry,
  DxScale
} from 'devextreme-vue/circular-gauge';

export default {
  components: {
    DxCircularGauge,
    DxSize,
    DxValueIndicator,
    DxGeometry,
    DxScale
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    startAngle: {
      type: Number,
      default: 0
    },
    endAngle: {
      type: Number,
      default: 90
    },
    inverted: {
      type: Boolean,
      default: true
    }
  }
};
</script>
