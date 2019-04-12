<template>
  <div class="buttons-demo">
    <div class="header">
      <div/>
      <div>Normal</div>
      <div>Success</div>
      <div>Default</div>
      <div>Danger</div>
    </div>
    <div class="types">
      <div>Contained</div>
      <div>Outlined</div>
      <div>Text</div>
    </div>
    <div class="buttons">
      <div
        v-for="(options, index) in buttonOptions"
        :key="index"
      >
        <dx-button
          :width="90"
          :text="options.text"
          :type="options.type"
          :styling-mode="options.stylingMode"
          @click="onClick($event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { DxButton } from 'devextreme-vue';
import notify from 'devextreme/ui/notify';

export default {
  components: {
    DxButton
  },
  data() {
    const baseOptions = [
      { text: 'OK', type: 'normal' },
      { text: 'Apply', type: 'success' },
      { text: 'Done', type: 'default' },
      { text: 'Delete', type: 'danger' }
    ];
    const modes = [ 'contained', 'outlined', 'text' ];

    var buttonOptions = [];

    modes.forEach(mode => {
      baseOptions.forEach(options => {
        buttonOptions.push({
          stylingMode: mode,
          text: options.text,
          type: options.type
        });
      });
    });
    return {
      buttonOptions: buttonOptions
    };
  },
  methods: {
    onClick(e) {
      const buttonText = e.component.option('text');
      notify(`The ${buttonText} button was clicked`);
    }
  }
};
</script>
<style scoped>
.demo-container {
  display: flex;
  justify-content: center;
  height: 450px;
}

.buttons-demo {
  width: 600px;
  align-self: center;
}

.header {
  display: flex;
  flex-wrap: nowrap;
}

.header > div {
  flex-grow: 0;
  flex-basis: 120px;
  height: 30px;
}

.types {
  width: 120px;
  display: flex;
  flex-direction: column;
  float: left;
}

.types > div {
  flex-grow: 1;
  padding: 10px;
  height: 30px;
  line-height: 20px;
  font-weight: bold;
  opacity: 0.7;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  margin-left: 120px;
}

.buttons > div {
  flex-basis: 120px;
  height: 50px;
}
</style>
