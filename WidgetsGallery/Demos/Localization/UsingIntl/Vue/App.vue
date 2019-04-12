<template>
  <div>
    <dx-data-grid
      :data-source="payments"
      key-expr="PaymentId"
    >
      <dx-editing
        :allow-updating="true"
        :popup="{width:700, height:345}"
        mode="popup"
      />
      <dx-filter-row
        :visible="true"
        apply-filter="auto"
      />
      <dx-column
        :caption="formatMessage('Number')"
        :allow-editing="false"
        :width="100"
        data-field="PaymentId"
      />
      <dx-column
        :caption="formatMessage('Contact')"
        data-field="ContactName"
      />
      <dx-column
        :caption="formatMessage('Company')"
        data-field="CompanyName"
      />
      <dx-column
        :caption="formatMessage('Amount')"
        :editor-options="{format: 'currency', showClearButton: true}"
        data-field="Amount"
        data-type="number"
        format="currency"
      />
      <dx-column
        :caption="formatMessage('PaymentDate')"
        data-field="PaymentDate"
        data-type="date"
      />
    </dx-data-grid>
    <div class="options">
      <div class="caption">Options</div>
      <div class="option">
        <label for="selectInput">Language</label>
        <dx-select-box
          :data-source="locales"
          :value="locale"
          :input-attr="{id: 'selectInput'}"
          value-expr="Value"
          display-expr="Name"
          @valueChanged="changeLocale($event)"
        />
      </div>
    </div>

  </div>
</template>
<script>

import { DxDataGrid, DxColumn, DxEditing, DxFilterRow } from 'devextreme-vue/data-grid';
import { DxSelectBox } from 'devextreme-vue';

import deMessages from 'npm:devextreme/localization/messages/de.json!json';
import ruMessages from 'npm:devextreme/localization/messages/ru.json!json';

import { locale, loadMessages, formatMessage } from 'devextreme/localization';
import 'devextreme-intl';

import service from './data.js';

export default {
  components: {
    DxSelectBox,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxFilterRow
  },
  data() {
    return {
      locale: null,
      locales: service.getLocales(),
      payments: service.getPayments()
    };
  },
  created() {
    this.locale = this.getLocale();
    this.initMessages();
    locale(this.locale);
  },
  methods: {
    getLocale() {
      const locale = sessionStorage.getItem('locale');
      return locale != null ? locale : 'en';
    },
    setLocale(locale) {
      sessionStorage.setItem('locale', locale);
    },
    initMessages() {
      loadMessages(deMessages);
      loadMessages(ruMessages);
      loadMessages(service.getDictionary());
    },
    changeLocale(e) {
      this.setLocale(e.value);
      document.location.reload();
    },
    formatMessage: formatMessage
  }
};
</script>
<style scoped>

.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
}

.option {
    margin-top: 10px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option > label {
    margin-right: 10px;
}

.option > .dx-selectbox {
    display: inline-block;
    vertical-align: middle;
}
</style>
