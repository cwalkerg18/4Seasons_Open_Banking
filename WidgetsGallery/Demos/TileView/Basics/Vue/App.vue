<template>
  <dx-tile-view
    :items="homes"
  >
    <div
      slot="item"
      slot-scope="data"
    >
      <div
        :style="{backgroundImage: 'url(' + data.ImageSrc + ')'}"
        class="dx-tile-image"
      />
    </div>
  </dx-tile-view>
</template>
<script>
import DxTileView from 'devextreme-vue/tile-view';

import { homes } from './data.js';

export default {
  components: {
    DxTileView
  },
  data() {
    return {
      homes
    };
  }
};
</script>
<style>
.dx-tile-image {
    height: 100%;
    width: 100%;
    background-position: center;
    background-size: cover;
    display: block;
}
</style>
