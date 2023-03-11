import { makeAutoObservable, runInAction } from 'mobx';
import APIs from './APIs';
import { HTTP } from './HTTP';
import messageStore from "./messages"

const userDefaultData = {
  id: "",
  name: '',
  email: 'this is auto filling if empty',
  role: '',
  password: ""
};
const defaultUsers = [
  {
    id: 1, name: "Bandaiah", email: "test@cpo.co", role: 'admin'
  },
  {
    id: 2, name: "Sairam", email: "?@cpo.co", role: 'NRI', password: "secret"
  }
]
class Data {
  userAdding = false;

  user = userDefaultData;

  userError = null;

  userValidationErrors = {};

  userLoading = false;

  users = defaultUsers;

  userFilters = { limit: 100, page: 1, total: 100000 };

  usersLoading = false;

  usersError = null;

  constructor() {
    makeAutoObservable(this);
  }

  getUserList() {
    this.usersLoading = true;
    return HTTP.get(APIs.users).then(
      (response) => {
        runInAction(() => {
          // this.users = response.data.users;
          this.usersLoading = false;
          this.userFilters = { limit: 100, page: 1, total: 100000 }
        });
      },
      (error) => {
        runInAction(() => {
          this.usersLoading = false;
          this.usersError = error.message;
        });
      }
    );
  }

  toggleUserAdd() {
    console.log("data not updating pro", this)
    this.userAdding = !this.userAdding;
    if (this.userAdding) {
      this.user = userDefaultData
    }
  }

  editUser(index) {
    this.user = this.users[index]
    this.userAdding = !this.userAdding;
  }

  SubmitUser(user, setSubmitting) {
    // messageStore.pushMessage({
    //   message: "Please select all props",
    //   title: "Please select all props",
    //   severity: "error",
    //   time: 10,
    //   canClose: false,
    //   status: 1,
    // });
    // setSubmitting(false)
    return HTTP.post(APIs.users, user).then(
      (response) => {
        runInAction(() => {
          this.user = userDefaultData;
          this.userError = null;
        });
      },
      (error) => {
        runInAction(() => {
          this.userError = error.message;
        });
      }
    );
  }

  resetUserList() {
    this.user = userDefaultData;
    this.users = [];
    this.usersError = null;
    this.usersLoading = false;
  }

  resetUse() {
    this.user = userDefaultData;
    this.userError = null;
  }
}

const myData = new Data();

export default myData;
