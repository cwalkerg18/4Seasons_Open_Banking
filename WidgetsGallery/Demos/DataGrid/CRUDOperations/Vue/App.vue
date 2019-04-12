<template>
  <div>
    <dx-data-grid
      id="grid"
      :show-borders="true"
      :data-source="ordersData"
      :repaint-changes-only="true"
    >
      <dx-editing
        :refresh-mode="refreshMode"
        :allow-adding="true"
        :allow-updating="true"
        :allow-removing="true"
        mode="cell"
      />
      <dx-column
        data-field="CustomerID"
        caption="Customer"
      >
        <dx-lookup
          :data-source="customersData"
          value-expr="Value"
          display-expr="Text"
        />
      </dx-column>
      <dx-column
        data-field="OrderDate"
        data-type="date"
      />
      <dx-column data-field="Freight"/>
      <dx-column data-field="ShipCountry"/>
      <dx-column
        data-field="ShipVia"
        caption="Shipping Company"
        data-type="number"
      >
        <dx-lookup
          :data-source="shippersData"
          value-expr="Value"
          display-expr="Text"
        />
      </dx-column>
      <dx-scrolling mode="virtual"/>
      <dx-editing
        :refresh-mode="refreshMode"
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="true"
        mode="cell"
      />
      <dx-summary>
        <dx-total-item
          column="CustomerID"
          summary-type="count"
        />
        <dx-total-item
          column="Freight"
          summary-type="sum"
          value-format="#0.00"
        />
      </dx-summary>
    </dx-data-grid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <span>Refresh Mode:</span>
        <dx-select-box
          v-model="refreshMode"
          :items="refreshModes"
        />
      </div>
      <div id="requests">
        <div>
          <div class="caption">Network Requests</div>
          <dx-button
            id="clear"
            text="Clear"
            @click="clearRequests()"
          />
        </div>
        <ul>
          <li
            v-for="(request, index) in requests"
            :key="index"
          >{{ request }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxSummary,
  DxLookup,
  DxTotalItem
} from 'devextreme-vue/data-grid';
import { DxButton } from 'devextreme-vue/button';
import { DxSelectBox } from 'devextreme-vue/select-box';

import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';
import 'whatwg-fetch';

const URL = 'https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi';

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxSummary,
    DxLookup,
    DxTotalItem,
    DxButton,
    DxSelectBox
  },
  data() {
    return {
      ordersData: new CustomStore({
        key: 'OrderID',
        load: () => this.sendRequest(`${URL}/Orders`),
        insert: (values) => this.sendRequest(`${URL}/InsertOrder`, 'POST', {
          values: JSON.stringify(values)
        }),
        update: (key, values) => this.sendRequest(`${URL}/UpdateOrder`, 'PUT', {
          key: key,
          values: JSON.stringify(values)
        }),
        remove: (key) => this.sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
          key: key
        })
      }),
      customersData: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => this.sendRequest(`${URL}/CustomersLookup`)
      }),
      shippersData: new CustomStore({
        key: 'Value',
        loadMode: 'raw',
        load: () => this.sendRequest(`${URL}/ShippersLookup`)
      }),
      requests: [],
      refreshMode: 'reshape',
      refreshModes: ['full', 'reshape', 'repaint']
    };
  },
  methods: {
    sendRequest(url, method, data) {
      method = method || 'GET';
      data = data || {};

      this.logRequest(method, url, data);

      const params = Object.keys(data).map((key) => {
        return `${encodeURIComponent(key) }=${ encodeURIComponent(data[key])}`;
      }).join('&');

      if(method === 'GET') {
        return fetch(url, {
          method: method,
          credentials: 'include'
        }).then(result => result.json().then(json => {
          if(result.ok) return json.data;
          throw json.Message;
        }));
      }

      return fetch(url, {
        method: method,
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        credentials: 'include'
      }).then(result => {
        if(result.ok) {
          return result.text().then(text => text && JSON.parse(text));
        } else {
          return result.json().then(json => {
            throw json.Message;
          });
        }
      });
    },
    logRequest(method, url, data) {
      var args = Object.keys(data || {}).map(function(key) {
        return `${key }=${ data[key]}`;
      }).join(' ');

      var time = formatDate(new Date(), 'HH:mm:ss');

      this.requests.unshift([time, method, url.slice(URL.length), args].join(' '));
    },
    clearRequests() {
      this.requests = [];
    }
  },
};
</script>
<style scoped>
#grid {
    height: 440px;
}

.options {
    padding: 20px;
    margin-top: 20px;
    background-color: rgba(191, 191, 191, 0.15);
}

.caption {
    margin-bottom: 10px;
	font-weight: 500;
	font-size: 18px;
}

.option {
    margin-bottom: 10px;
}

.option > span {
    position: relative;
    top: 2px;
    margin-right: 10px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}

#requests .caption {
    float: left;
    padding-top: 7px;
}

#requests > div {
    padding-bottom: 5px;
}

#requests > div:after {
    content: "";
    display: table;
    clear: both;
}

#requests #clear {
    float: right;
}

#requests ul {
    list-style: none;
    max-height: 100px;
    overflow: auto;
    margin: 0;
}

#requests ul li {
    padding: 7px 0;
    border-bottom: 1px solid #dddddd;
}

#requests ul li:last-child {
    border-bottom: none;
}
</style>
