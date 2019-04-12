<template>
  <form
    action="your-action"
    @submit="onFormSubmit($event)"
  >
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Credentials</div>
      <div class="dx-field">
        <div class="dx-field-label">Email</div>
        <div class="dx-field-value">
          <dx-text-box>
            <dx-validator>
              <dx-required-rule message="Email is required"/>
              <dx-email-rule message="Email is invalid"/>
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Password</div>
        <div class="dx-field-value">
          <dx-text-box
            :value.sync="password"
            mode="password"
          >
            <dx-validator>
              <dx-required-rule message="Password is required"/>
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Confirm Password</div>
        <div class="dx-field-value">
          <dx-text-box mode="password">
            <dx-validator>
              <dx-required-rule message="Confirm Password is required"/>
              <dx-compare-rule
                :comparison-target="passwordComparison"
                message="Password and Confirm Password do not match"
              />
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Personal Data</div>
      <div class="dx-field">
        <div class="dx-field-label">Name</div>
        <div class="dx-field-value">
          <dx-text-box value="Peter">
            <dx-validator>
              <dx-required-rule message="Name is required"/>
              <dx-pattern-rule
                :pattern="namePattern"
                message="Do not use digits in the Name"
              />
              <dx-string-length-rule
                :min="2"
                message="Name must have at least 2 symbols"
              />
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Date of birth</div>
        <div class="dx-field-value">
          <dx-date-box
            invalid-date-message="The date must have the following format: MM/dd/yyyy"
          >
            <dx-validator>
              <dx-required-rule message="Date of birth is required"/>
              <dx-range-rule
                :max="maxDate"
                message="You must be at least 21 years old"
              />
            </dx-validator>
          </dx-date-box>
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Billing address</div>
      <div class="dx-field">
        <div class="dx-field-label">Country</div>
        <div class="dx-field-value">
          <dx-select-box :data-source="countries">
            <dx-validator>
              <dx-required-rule message="Country is required"/>
            </dx-validator>
          </dx-select-box>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">City</div>
        <div class="dx-field-value">
          <dx-text-box>
            <dx-validator>
              <dx-required-rule message="City is required"/>
              <dx-pattern-rule
                :pattern="namePattern"
                message="Do not use digits in the City name"
              />
              <dx-string-length-rule
                :min="2"
                message="City must have at least 2 symbols"
              />
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Address</div>
        <div class="dx-field-value">
          <dx-text-box>
            <dx-validator>
              <dx-required-rule message="Address is required"/>
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Phone <i>(optional)</i></div>
        <div class="dx-field-value">
          <dx-text-box
            :mask-rules="phoneRules"
            :use-masked-value="true"
            mask="+1 (X00) 000-0000"
            mask-invalid-message="The phone must have a correct USA phone format"
          >
            <dx-validator>
              <dx-pattern-rule
                :pattern="phonePattern"
                message="The phone must have a correct USA phone format"
              />
            </dx-validator>
          </dx-text-box>
        </div>
      </div>
      <div>
        <dx-check-box
          id="check"
          :value="false"
          text="I agree to the Terms and Conditions"
        >
          <dx-validator>
            <dx-compare-rule
              :comparison-target="checkComparison"
              message="You must agree to the Terms and Conditions"
            />
          </dx-validator>
        </dx-check-box>
      </div>
    </div>

    <div class="dx-fieldset">
      <dx-validation-summary id="summary"/>
      <dx-button
        id="button"
        :use-submit-behavior="true"
        text="Register"
        type="success"
      />
    </div>
  </form>
</template>
<script>
import { DxSelectBox, DxCheckBox, DxTextBox, DxDateBox, DxButton, DxValidationSummary } from 'devextreme-vue';
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule
} from 'devextreme-vue/validator';

import notify from 'devextreme/ui/notify';
import service from './data.js';

export default {
  components: {
    DxSelectBox,
    DxCheckBox,
    DxTextBox,
    DxDateBox,
    DxButton,
    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxValidationSummary
  },
  data() {
    const currentDate = new Date();
    return {
      countries: service.getCountries(),
      phoneRules: {
        X: /[02-9]/
      },
      password: '',
      passwordComparison: () => {
        return this.password;
      },
      namePattern: /^[^0-9]+$/,
      phonePattern: /^\+\s*1\s*\(\s*[02-9]\d{2}\)\s*\d{3}\s*-\s*\d{4}$/,
      maxDate: new Date(currentDate.setFullYear(currentDate.getFullYear() - 21)),
      checkComparison: () => true
    };
  },
  methods: {
    onFormSubmit(e) {
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
#summary {
    padding-left: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
}

#button {
    display: block;
}
</style>
