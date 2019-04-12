<template>
  <div class="custom-item">
    <img :src="fieldData.ImageSrc">
    <dx-text-box
      :value="fieldData.Name"
      :read-only="true"
      class="product-name"
    />
  </div>
</template>
<script>
import { DxTextBox } from 'devextreme-vue';

export default {
  components: {
    DxTextBox
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
