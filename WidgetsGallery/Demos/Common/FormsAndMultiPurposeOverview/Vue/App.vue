<template>
  <dx-form
    :form-data="formData"
    :items="items"
  />
</template>
<script>

import { DxForm } from 'devextreme-vue';

import { employee, positions, states } from './data.js';

export default {
  components: {
    DxForm
  },
  data: function() {
    return {
      formData: employee,
      items: [{
        itemType: 'group',
        cssClass: 'first-group',
        colCount: 4,
        items: [{
          template: "<div class='form-avatar'></div>"
        }, {
          itemType: 'group',
          colSpan: 3,
          items: [{
            dataField: 'FirstName'
          }, {
            dataField: 'LastName'
          }, {
            dataField: 'BirthDate',
            editorType: 'dxDateBox',
            editorOptions: {
              width: '100%'
            }
          }]
        }]
      }, {
        itemType: 'group',
        cssClass: 'second-group',
        colCount: 2,
        items: [{
          itemType: 'group',
          items: [{
            dataField: 'Address'
          }, {
            dataField: 'City'
          }, {
            dataField: 'Position',
            editorType: 'dxSelectBox',
            editorOptions: {
              items: positions,
              value: ''
            }
          }]
        }, {
          itemType: 'group',
          items: [{
            dataField: 'State',
            editorType: 'dxSelectBox',
            editorOptions: {
              items: states
            },
          }, {
            dataField: 'ZipCode'
          }, {
            dataField: 'Mobile',
            label: {
              text: 'Phone'
            },
            editorOptions: {
              mask: '+1 (000) 000-0000'
            }
          }]
        }, {
          colSpan: 2,
          dataField: 'Notes',
          editorType: 'dxTextArea',
          editorOptions: {
            height: 140
          }
        }]
      }]
    };
  }
};
</script>
<style>
.first-group,
.second-group {
    padding: 20px;
}
.second-group {
    background-color: rgba(191, 191, 191, 0.15);
}
.form-avatar {
    height: 128px;
    width: 128px;
    margin-right: 10px;
    border: 1px solid #d2d3d5;
    border-radius: 50%;
    background-image: url('../../../../images/petersmith.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
