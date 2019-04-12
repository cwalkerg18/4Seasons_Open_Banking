<template>
  <div id="form-demo">
    <div class="widget-container">
      <form
        action="your-action"
        @submit="handleSubmit"
      >
        <dx-form
          :form-data.sync="customer"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <dx-group-item caption="Credentials">
            <dx-simple-item data-field="Email">
              <dx-required-rule message="Email is required"/>
              <dx-email-rule message="Email is invalid"/>
            </dx-simple-item>
            <dx-simple-item
              :editor-options="passwordOptions"
              data-field="Password"
            >
              <dx-required-rule message="Password is required"/>
            </dx-simple-item>
            <dx-simple-item
              :editor-options="passwordOptions"
              editor-type="dxTextBox"
            >
              <dx-label text="Confirm Password"/>
              <dx-required-rule message="Confirm Password is required"/>
              <dx-compare-rule
                :comparison-target="passwordComparison"
                message="Password and Confirm Password do not match"
              />
            </dx-simple-item>
          </dx-group-item>
          <dx-group-item caption="Personal Data">
            <dx-simple-item data-field="Name">
              <dx-required-rule message="Name is required"/>
              <dx-pattern-rule
                :pattern="namePattern"
                message="Do not use digits in the Name"
              />
            </dx-simple-item>
            <dx-simple-item
              :editor-options="dateBoxOptions"
              data-field="Date"
              editor-type="dxDateBox"
            >
              <dx-label text="Date of birth"/>
              <dx-required-rule message="Date of birth is required"/>
              <dx-range-rule
                :max="maxDate"
                message="You must be at least 21 years old"
              />
            </dx-simple-item>
          </dx-group-item>
          <dx-group-item caption="Billing address">
            <dx-simple-item
              :editor-options="countryEditorOptions"
              data-field="Country"
              editor-type="dxSelectBox"
            >
              <dx-required-rule message="Country is required"/>
            </dx-simple-item>
            <dx-simple-item
              :editor-options="cityEditorOptions"
              data-field="City"
              editor-type="dxAutocomplete"
            >
              <dx-pattern-rule
                :pattern="cityPattern"
                message="Do not use digits in the City name"
              />

              <dx-string-length-rule
                :min="2"
                message="City must have at least 2 symbols"
              />
              <dx-required-rule message="City is required"/>
            </dx-simple-item>
            <dx-simple-item data-field="Address">
              <dx-required-rule message="Address is required"/>
            </dx-simple-item>
            <dx-simple-item
              :editor-options="phoneEditorOptions"
              data-field="Phone"
              help-text="Enter the phone number in USA phone format"
            >
              <dx-pattern-rule
                :pattern="phonePattern"
                message="The phone must have a correct USA phone format"
              />
            </dx-simple-item>
            <dx-simple-item
              :editor-options="checkBoxOptions"
              data-field="Accepted"
              editor-type="dxCheckBox"
            >
              <dx-label :visible="false"/>
              <dx-compare-rule
                :comparison-target="checkComparison"
                type="compare"
                message="You must agree to the Terms and Conditions"
              />
            </dx-simple-item>
          </dx-group-item>
          <dx-button-item
            :button-options="buttonOptions"
            horizontal-alignment="left"
          />
        </dx-form>
      </form>
    </div>
  </div>
</template>
<script>
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxEmailRule
} from 'devextreme-vue/form';
import DxAutocomplete from 'devextreme-vue/autocomplete';

import notify from 'devextreme/ui/notify';

import service from './data.js';

export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxStringLengthRule,
    DxForm,
    DxAutocomplete,
    notify
  },
  data() {
    return {
      customer: service.getCustomer(),
      buttonOptions: {
        text: 'Register',
        type: 'success',
        useSubmitBehavior: true
      },
      passwordOptions: {
        mode: 'password'
      },
      dateBoxOptions: {
        invalidDateMessage:
          'The date must have the following format: MM/dd/yyyy'
      },
      checkBoxOptions: {
        text: 'I agree to the Terms and Conditions',
        value: false
      },
      phoneEditorOptions: {
        mask: '+1 (X00) 000-0000',
        maskRules: {
          X: /[02-9]/
        },
        useMaskedValue: true,
        maskInvalidMessage: 'The phone must have a correct USA phone format'
      },
      cityEditorOptions:{
        dataSource: service.getCities(),
        minSearchLength: 2
      },
      countryEditorOptions: {
        dataSource: service.getCountries()
      },
      maxDate: new Date().setYear(new Date().getYear() - 21),
      namePattern: /^[^0-9]+$/,
      cityPattern: /^[^0-9]+$/,
      phonePattern:  /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/

    };
  },
  methods: {
    passwordComparison() {
      return this.customer.Password;
    },
    checkComparison() {
      return true;
    },
    handleSubmit(e) {
      notify({
        message: 'You have submitted the form',
        position: {
          my: 'center top',
          at: 'center top'
        }
      }, 'success', 3000);
      e.preventDefault();
    }
  }
};
</script>
<style scoped>
form {
  margin: 10px;
}
</style>
