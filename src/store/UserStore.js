import { makeAutoObservable, runInAction } from 'mobx';
import APIs from './APIs';
import { HTTP } from './HTTP';
import messageStore from "./messages"

const userDefaultData = {
  userid : "",
  firstname : "",
  lastname : "",
  password : "",
  passwordConfirmation : "",
  email : "",
  mobile : ""
};

const userLoginData = {
  password : "",
  email : ""
};
const defaultUsers = [
  {
    id: 1, name: "Bandaiah", email: "test@cpo.co", role: 'admin'
  },
  {
    id: 2, name: "Sairam", email: "?@cpo.co", role: 'NRI', password: "secret"
  }
]
class UserStore {



  dept = [];

  userInitialValues = userDefaultData;

  userRes = {};

  userError = null;

  userSuccess = "";

  userAdding = false;

  user = userDefaultData;

  userLoginInitialValues = userLoginData;
  
  // global
  userLoginSuccess = false;

  userunqid = "";
  


  userValidationErrors = {};

  userLoading = false;

  users = defaultUsers;

  userFilters = { limit: 100, page: 1, total: 100000 };

  usersLoading = false;

  usersError = null;

  constructor() {
    makeAutoObservable(this);
  }

  // getUniqID(){
  //   if(window.localStorage.getItem('unqid')!== null || window.localStorage.getItem('unqid')!== ""){
  //     this.userLoginSuccess = true
  //   }else{
  //     this.userLoginSuccess = false
  //   }
  // }

  userLogout(){
    this.userLoginSuccess = false
  }

  getUserList() {
    this.usersLoading = true;
    return HTTP.get(APIs.users).then(
      (response) => {
        runInAction(() => {
          // this.users = response.data.users;
          this.usersLoading = false;
          // this.userFilters = { limit: 100, page: 1, total: 100000 }
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
    
    let tempUser = {...user}
    if(!tempUser.mobile) tempUser.mobile = "123456";
    if(!tempUser.userid) delete tempUser.userid;
    if(tempUser.passwordConfirmation) delete tempUser.passwordConfirmation;
    tempUser = {...tempUser, isverified:true, userdepartments : []}

    console.log("userStore",tempUser);

    return HTTP.post(APIs.userSignUp, tempUser).then(
      (response) => {
        runInAction(() => {
          this.userSuccess = ""
          console.log(response)
          if(response.status!=="SUCCESS"){
            setSubmitting(false)
            this.userError = response.message ? response.message : "Network or Server Error";
            messageStore.pushMessage({
              message: this.userError,
              title: this.userError,
              severity: "error",
              time: 10,
              canClose: false,
              status: 1,
            });
          }
          this.userRes = response;
          if(response.status === "SUCCESS") {
            this.userSuccess = "Registered Successfully"
            
          };
        });
      },
      (error) => {
        runInAction(() => {
          this.userError = error.message;
        });
      }
    );
  }

  UserLogin(user, setSubmitting) {
    return HTTP.post(APIs.userLogin, user).then(
      (response) => {
        runInAction(() => {
          setSubmitting(false)
          this.userSuccess = ""
          console.log(response)
          if(response.status!=="SUCCESS"){
            this.userError = response.message ? response.message : "Network or Server Error";
            messageStore.pushMessage({
              message: this.userError,
              title: this.userError,
              severity: "error",
              time: 10,
              canClose: false,
              status: 1,
            });
          }
          this.userRes = response.data;
          if(response.status === "SUCCESS") {
            console.log(this.userRes.userid)
            window.localStorage.setItem('unqid', this.userRes.userid);
            this.userSuccess = "User Logged in Successfully"
            this.userLoginSuccess = true;
          };
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

const userStore = new UserStore();

export default userStore;
