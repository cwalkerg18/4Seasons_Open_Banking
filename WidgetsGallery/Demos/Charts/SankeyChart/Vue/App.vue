<template>
  <dx-sankey
    id="sankey"
    :data-source="data"
    source-field="source"
    target-field="target"
    weight-field="weight"
    title="Commodity Turnover in 2017"
  >
    <dx-tooltip
      :enabled="true"
      :customize-link-tooltip="customizeLinkTooltip"
    />
    <dx-node
      :width="8"
      :padding="30"
    />
    <dx-link color-mode="gradient"/>

  </dx-sankey>
</template>
<script>

import DxSankey, {
  DxTooltip,
  DxNode,
  DxLink
} from 'devextreme-vue/sankey';

import { data } from './data.js';

export default {
  components: {
    DxSankey,
    DxTooltip,
    DxNode,
    DxLink
  },
  data() {
    return {
      customizeLinkTooltip(info) {
        return {
          html: `<b>From:</b> ${info.source}<br/><b>To:</b> ${info.target}<br/><b>Weight:</b> ${info.weight}`
        };
      }
    };
  },
  computed: {
    data() {
      return data;
    }
  }
};
</script>
<style>
#sankey {
    height: 440px;
}
</style>
