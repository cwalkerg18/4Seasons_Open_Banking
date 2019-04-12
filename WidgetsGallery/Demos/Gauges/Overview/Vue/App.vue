<template>
  <div id="gauge-demo">
    <div id="gauge-container">
      <div class="left-section">
        <gauge-indicator
          :value="speedValue / 2"
          :inverted="false"
          :start-angle="180"
          :end-angle="90"
        />
        <gauge-indicator
          :value="speedValue / 2"
          :inverted="true"
          :start-angle="-90"
          :end-angle="-180"
        />
      </div>
      <div class="center-section">
        <dx-circular-gauge :value="speedValue">
          <dx-size :width="260"/>
          <dx-value-indicator
            :second-fraction="0.24"
            type="twoColorNeedle"
            color="none"
            second-color="#f05b41"
          />
          <dx-geometry
            :start-angle="225"
            :end-angle="315"
          />
          <dx-scale
            :start-value="20"
            :end-value="200"
            :tick-interval="20"
            :minor-tick-interval="10"
          />
        </dx-circular-gauge>
        <div class="speed-value">
          <span>{{ speedValue }}</span>
        </div>
        <dx-linear-gauge
          id="fuel-gauge"
          :value="50 - speedValue * 0.24"
        >
          <dx-linear-size
            :width="90"
            :height="20"
          />
          <dx-linear-scale
            :start-value="0"
            :end-value="50"
            :tick-interval="25"
            :minor-tick-interval="12.5"
          >
            <dx-minor-tick :visible="true"/>
            <dx-label :visible="false"/>
          </dx-linear-scale>
          <dx-linear-value-indicator
            :size="8"
            :offset="7"
            color="#f05b41"
          />
        </dx-linear-gauge>
      </div>
      <div class="right-section">
        <gauge-indicator
          :value="speedValue / 2"
          :inverted="true"
          :start-angle="90"
          :end-angle="0"
        />
        <gauge-indicator
          :value="speedValue / 2"
          :inverted="false"
          :start-angle="0"
          :end-angle="-90"
        />
      </div>
    </div>
    <dx-slider
      id="slider"
      v-model="speedValue"
      :width="155"
      :min="0"
      :max="200"
    />
  </div>
</template>
<script>

import DxSlider from 'devextreme-vue/slider';
import DxCircularGauge, {
  DxSize,
  DxValueIndicator,
  DxGeometry,
  DxScale
} from 'devextreme-vue/circular-gauge';
import DxLinearGauge, {
  DxSize as DxLinearSize,
  DxValueIndicator as DxLinearValueIndicator,
  DxScale as DxLinearScale,
  DxMinorTick,
  DxLabel
} from 'devextreme-vue/linear-gauge';

import GaugeIndicator from './GaugeIndicator.vue';

export default {
  components: {
    DxSlider,

    DxCircularGauge,
    DxSize,
    DxValueIndicator,
    DxGeometry,
    DxScale,

    DxLinearGauge,
    DxLinearSize,
    DxLinearValueIndicator,
    DxLinearScale,
    DxMinorTick,
    DxLabel,

    GaugeIndicator
  },
  data: function() {
    return {
      speedValue: 40
    };
  }
};
</script>
<style src="./styles.css"></style>
