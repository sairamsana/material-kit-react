import { makeAutoObservable, runInAction } from 'mobx';
import APIs from './APIs';
import { HTTP } from './HTTP';
import messageStore from "./messages"


class UtilStore {

  dept = [];

  isLoadingDept = false;
  
  deptErrorMsg = "";


  constructor() {
    makeAutoObservable(this);
  }


  getDeptList() {
    this.isLoadingDept = true;
    return HTTP.get(APIs.deptList).then(
      (response) => {
        runInAction(() => {
          console.log(response);
          this.dept = response.data.departmentsDTO;
          this.isLoadingDept = false;
        });
      },
      (error) => {
        runInAction(() => {
          this.usersLoading = false;
          this.deptErrorMsg = error;
        });
      }
    );
  }

  // toggleUserAdd() {
  //   console.log("data not updating pro", this)
  //   this.userAdding = !this.userAdding;
  //   if (this.userAdding) {
  //     this.user = userDefaultData
  //   }
  // }

  // editUser(index) {
  //   this.user = this.users[index]
  //   this.userAdding = !this.userAdding;
  // }

  // SubmitUser(user, setSubmitting) {
  //   messageStore.pushMessage({
  //     message: "Please select all props",
  //     title: "Please select all props",
  //     severity: "error",
  //     time: 10,
  //     canClose: false,
  //     status: 1,
  //   });
  //   console.log("userStore",user);
  //   setInterval(()=>{
  //     setSubmitting(false)
  //   }, 9000);
    
  //   return HTTP.post(APIs.users, user).then(
  //     (response) => {
  //       runInAction(() => {
  //         this.user = userDefaultData;
  //         this.userError = null;
  //       });
  //     },
  //     (error) => {
  //       runInAction(() => {
  //         this.userError = error.message;
  //       });
  //     }
  //   );
  // }

  // resetUserList() {
  //   this.user = userDefaultData;
  //   this.users = [];
  //   this.usersError = null;
  //   this.usersLoading = false;
  // }

  // resetUse() {
  //   this.user = userDefaultData;
  //   this.userError = null;
  // }
}

const utilStore = new UtilStore();

export default utilStore;
