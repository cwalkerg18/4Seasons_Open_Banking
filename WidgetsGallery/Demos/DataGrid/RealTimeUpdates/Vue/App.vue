<template>
  <div>
    <dx-data-grid
      :ref="dataGridRefName"
      :data-source="productsDataSource"
      :repaint-changes-only="true"
      :two-way-binding-enabled="false"
      :column-auto-width="true"
      :show-borders="true"
    >

      <dx-paging :page-size="10"/>

      <dx-column
        data-field="ProductName"
        data-type="string"
      />
      <dx-column
        data-field="UnitPrice"
        data-type="number"
        format="currency"
      />
      <dx-column
        data-field="OrderCount"
        data-type="number"
      />
      <dx-column
        data-field="Quantity"
        data-type="number"
      />
      <dx-column
        data-field="Amount"
        data-type="number"
        format="currency"
      />

      <dx-summary>
        <dx-total-item
          column="ProductName"
          summary-type="count"
        />
        <dx-total-item
          column="Amount"
          summary-type="sum"
          display-format="{0}"
          value-format="currency"
        />
        <dx-total-item
          column="OrderCount"
          summary-type="sum"
          display-format="{0}"
        />
      </dx-summary>

      <dx-master-detail
        :enabled="true"
        template="productDetail"
      />

      <div
        slot="productDetail"
        slot-scope="detail"
      >
        <dx-data-grid
          :data-source="getDetailGridDataSource(detail.data)"
          :column-auto-width="true"
          :repaint-changes-only="true"
          :two-way-binding-enabled="false"
          :show-borders="true"
        >

          <dx-paging :page-size="5"/>

          <dx-column
            data-field="OrderID"
            data-type="number"
          />
          <dx-column
            data-field="ShipCity"
            data-type="string"
          />
          <dx-column
            data-field="OrderDate"
            data-type="datetime"
            format="yyyy/MM/dd HH:mm:ss"
          />
          <dx-column
            data-field="UnitPrice"
            data-type="number"
            format="currency"
          />
          <dx-column
            data-field="Quantity"
            data-type="number"
          />
          <dx-column
            :allow-sorting="true"
            :calculate-cell-value="getAmount"
            caption="Amount"
            format="currency"
            data-type="number"
          />

          <dx-summary>
            <dx-total-item
              column="OrderID"
              summary-type="count"
            />
            <dx-total-item
              column="Quantity"
              summary-type="sum"
              display-format="{0}"
            />
            <dx-total-item
              column="Amount"
              summary-type="sum"
              display-format="{0}"
              value-format="currency"
            />
          </dx-summary>
        </dx-data-grid>
      </div>

    </dx-data-grid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Update frequency:</span>
        <dx-slider
          :min="10"
          :step="10"
          :max="5000"
          :value.sync="updatesPerSecond"
        >
          <dx-tooltip
            :enabled="true"
            format="#0 per second"
            show-mode="always"
            position="top"
          />
        </dx-slider>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxSummary,
  DxTotalItem,
  DxMasterDetail,
  DxPaging
} from 'devextreme-vue/data-grid';
import { DxSlider, DxTooltip } from 'devextreme-vue/slider';
import { productsStore, ordersStore, getOrderCount, addOrder } from './data.js';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxSummary,
    DxTotalItem,
    DxMasterDetail,
    DxPaging,
    DxSlider,
    DxTooltip
  },
  data() {
    return {
      updatesPerSecond: 100,
      dataGridRefName: 'dataGrid',
      productsDataSource: {
        store: productsStore,
        reshapeOnPush: true
      }
    };
  },
  created() {
    setInterval(() => {
      if(getOrderCount() > 500000) {
        return;
      }

      for(var i = 0; i < this.updatesPerSecond / 20; i++) {
        addOrder();
      }
    }, 50);
  },
  methods: {
    getDetailGridDataSource(product) {
      return {
        store: ordersStore,
        reshapeOnPush: true,
        filter: ['ProductID', '=', product.ProductID]
      };
    },
    getAmount(order) {
      return order.UnitPrice * order.Quantity;
    }
  }
};
</script>
<style scoped>
.options {
  padding: 20px;
  margin-top: 20px;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
    margin-top: 10px;
}

.option > span {
    position: relative;
    top: 2px;
    margin-right: 10px;
}

.option > .dx-widget {
    width: 500px;
    display: inline-block;
    vertical-align: middle;
}
</style>
