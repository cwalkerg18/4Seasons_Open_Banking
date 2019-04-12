<template>
  <div>
    <dx-box
      :height="75"
      direction="row"
      width="100%"
    >
      <dx-item
        :ratio="1"
      >
        <div
          slot-scope="_"
          class="rect demo-dark"
        >ratio = 1</div>
      </dx-item>
      <dx-item
        :ratio="2"
      >
        <div
          slot-scope="_"
          class="rect demo-light"
        >ratio = 2</div>
      </dx-item>
      <dx-item
        :ratio="1"
      >
        <div
          slot-scope="_"
          class="rect demo-dark"
        >ratio = 1</div>
      </dx-item>
    </dx-box>
    <br>
    <dx-box
      :height="75"
      direction="row"
      width="100%"
    >
      <dx-item
        :ratio="0"
        :base-size="150"
      >
        <div
          slot-scope="_"
          class="rect demo-dark"
        >150px</div>
      </dx-item>
      <dx-item :ratio="1">
        <dx-box
          :height="75"
          class="demo-light"
          direction="row"
          width="100%"
          align="center"
          cross-align="center"
        >
          <dx-item
            :ratio="0"
            :base-size="50"
          >
            <div slot-scope="_">
              <div class="small"/>
            </div>
          </dx-item>
          <dx-item
            :ratio="0"
            :base-size="50"
          >
            <div slot-scope="_">
              <div class="small"/>
            </div>
          </dx-item>
          <dx-item
            :ratio="0"
            :base-size="50"
          >
            <div slot-scope="_">
              <div class="small"/>
            </div>
          </dx-item>
        </dx-box>
      </dx-item>
      <dx-item
        :ratio="0"
        base-size="10%"
      >
        <div
          slot-scope="_"
          class="rect demo-dark"
        >10%</div>
      </dx-item>
    </dx-box>
    <br>
    <dx-box
      :height="250"
      direction="col"
      width="100%"
    >
      <dx-item
        :ratio="1"
      >
        <div
          slot-scope="_"
          class="rect demo-dark header"
        >Header</div>
      </dx-item>
      <dx-item
        :ratio="2"
        :base-size="0"
      >
        <dx-box
          :height="125"
          direction="row"
          width="100%"
        >
          <dx-item :ratio="1">
            <div
              slot-scope="_"
              class="rect demo-dark"
            >Left Bar</div>
          </dx-item>
          <dx-item :ratio="1">
            <div
              slot-scope="_"
              class="rect demo-light"
            >Content</div>
          </dx-item>
          <dx-item :ratio="1">
            <div
              slot-scope="_"
              class="rect demo-dark"
            >Right Bar</div>
          </dx-item>
        </dx-box>
      </dx-item>
      <dx-item :ratio="1">
        <div
          slot-scope="_"
          class="rect demo-dark footer"
        >Footer</div>
      </dx-item>
    </dx-box>
  </div>
</template>
<script>
import { DxBox, DxItem } from 'devextreme-vue/box';

export default {
  components: {
    DxBox,
    DxItem
  }
};
</script>
<style>
.rect {
    text-align: center;
    font-size: 30px;
    padding-top: 10px;
    height: 100%;
}

.demo-light {
    background: rgba(245, 229, 166, 0.5)
}

.demo-dark {
    background: rgba(148, 215, 199, 0.5);
}

.demo-dark.header {
    background: rgba(243, 158, 108, 0.5);
}

.demo-dark.footer {
    background: rgba(123, 155, 207, 0.5);
}

.small {
    height: 50px;
    border: 1px solid lightgray;
}

</style>
