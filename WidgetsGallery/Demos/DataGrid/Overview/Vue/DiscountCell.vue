<template>
  <dx-bullet
    :show-target="false"
    :show-zero-level="true"
    :value="cellData.value * 100"
    :start-scale-value="0"
    :end-scale-value="100"
  >
    <dx-size
      :width="150"
      :height="35"
    />
    <dx-margin
      :top="5"
      :bottom="0"
      :left="5"
    />
    <dx-tooltip
      :enabled="true"
      :padding-top-bottom="2"
      :z-index="5"
      :customize-tooltip="customizeTooltip"
    >
      <dx-font :size="18"/>
    </dx-tooltip>
  </dx-bullet>
</template>
<script>
import {
  DxBullet,
  DxFont,
  DxMargin,
  DxSize,
  DxTooltip
} from 'devextreme-vue/bullet';

export default {
  components: {
    DxBullet,
    DxFont,
    DxMargin,
    DxSize,
    DxTooltip
  },
  props: {
    cellData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      customizeTooltip: function(data) {
        return {
          text: `${parseInt(data.value)}%`
        };
      }
    };
  }
};
</script>
<style>
.dx-datagrid .dx-data-row > td.bullet {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
