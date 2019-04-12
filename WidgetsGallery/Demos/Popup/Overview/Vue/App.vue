<template>
  <div id="popup">
    <h1>Employees</h1>

    <ul>
      <employee-item
        v-for="employee in employees"
        :key="employee.ID"
        :employee="employee"
        :show-info="showInfo"
      />
    </ul>

    <dx-popup
      :visible.sync="popupVisible"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="300"
      :height="250"
      class="popup"
      title="Information"
    >
      <p>
        Full Name:&nbsp;
        <span>{{ currentEmployee.FirstName }}</span>&nbsp;
        <span>{{ currentEmployee.LastName }}</span>
      </p>
      <p>
        Birth Date: <span>{{ currentEmployee.BirthDate }}</span>
      </p>
      <p>
        Address: <span>{{ currentEmployee.Address }}</span>
      </p>
      <p>
        Hire Date: <span>{{ currentEmployee.HireDate }}</span>
      </p>
      <p>
        Position: <span>{{ currentEmployee.Position }}</span>
      </p>
    </dx-popup>

  </div>
</template>
<script>
import { DxPopup } from 'devextreme-vue/popup';
import EmployeeItem from './EmployeeItem.vue';
import { employees } from './data.js';

export default {
  components: {
    DxPopup,
    EmployeeItem
  },

  data() {
    return {
      employees,
      currentEmployee: {},
      popupVisible: false
    };
  },

  methods: {
    showInfo(employee) {
      this.currentEmployee = employee;
      this.popupVisible = true;
    }
  }
};
</script>
<style>
#popup {
  padding: 10px;
}

#popup ul {
  list-style-type: none;
  text-align: center;
}

#popup ul li {
  display: inline-block;
  width: 160px;
  margin: 10px;
}

#popup ul li img {
  width: 100px;
}

.button-info {
  margin: 10px;
}

.popup p {
  margin-bottom: 10px;
  margin-top: 0;
}
</style>

