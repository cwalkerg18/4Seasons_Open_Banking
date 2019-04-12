<template>
  <div id="page">
    <dx-responsive-box
      :screen-by-width="screen"
      single-column-screen="sm"
    >
      <dx-row :ratio="1"/>
      <dx-row
        :ratio="2"
        screen="xs"
      />
      <dx-row :ratio="2"/>
      <dx-row :ratio="1"/>

      <dx-col :ratio="1"/>
      <dx-col
        :ratio="2"
        screen="lg"
      />
      <dx-col :ratio="1"/>
      <dx-item>
        <dx-location
          :row="0"
          :col="0"
          :colspan="3"
          screen="lg"
        />
        <dx-location
          :row="0"
          :col="0"
          :colspan="2"
          screen="sm"
        />
        <div
          slot-scope="_"
          class="header item"
        >
          <p>Header</p>
        </div>
      </dx-item>
      <dx-item>
        <dx-location
          :row="1"
          :col="1"
          screen="lg"
        />
        <dx-location
          :row="1"
          :col="0"
          :colspan="2"
          screen="sm"
        />
        <div
          slot-scope="_"
          class="content item"
        >
          <p>Content</p>
        </div>
      </dx-item>
      <dx-item>
        <dx-location
          :row="1"
          :col="0"
          screen="lg"
        />
        <dx-location
          :row="2"
          :col="0"
          screen="sm"
        />
        <div
          slot-scope="_"
          class="left-side-bar item"
        >
          <p>Left Bar</p>
        </div>
      </dx-item>
      <dx-item>
        <dx-location
          :row="1"
          :col="2"
          screen="lg"
        />
        <dx-location
          :row="2"
          :col="1"
          screen="sm"
        />
        <div
          slot-scope="_"
          class="right-side-bar item"
        >
          <p>Right Bar</p>
        </div>
      </dx-item>
      <dx-item>
        <dx-location
          :row="2"
          :col="0"
          :colspan="3"
          screen="lg"
        />
        <dx-location
          :row="3"
          :col="0"
          :colspan="2"
          screen="sm"
        />
        <div
          slot-scope="_"
          class="footer item"
        >
          <p>Footer</p>
        </div>
      </dx-item>
    </dx-responsive-box>
  </div>

</template>
<script>
import { DxResponsiveBox, DxItem, DxLocation, DxCol, DxRow } from 'devextreme-vue/responsive-box';

export default {
  components: {
    DxResponsiveBox,
    DxItem,
    DxLocation,
    DxCol,
    DxRow
  },
  data() {
    return {
      screen(width) {
        return (width < 700) ? 'sm' : 'lg';
      }
    };
  }
};
</script>
<style>
.demo-container, #page{
    height: 100%;
    min-height: 300px;
}

.header {
    background-color: rgba(243, 158, 108, 0.80);
    text-align: center;
}

.content {
    background-color: rgba(245, 229, 166, 0.80);
}

.left-side-bar {
    background-color: rgba(148, 215, 199, 0.80);
}

.right-side-bar {
    background-color: rgba(119, 199, 231, 0.80);
}

.footer {
    background-color: rgba(123, 155, 207, 0.80);
}

.item {
    height: 100%;
}

#page p {
    font-size: 20px;
    padding-top: 10px;
    text-align: center;
}
</style>
