import firebase from "./firebaseConfig";
var fire = firebase.database().ref("/");
export function pushData(payload) {
  return new Promise((res, rej) => {
    fire
      .child("donors")
      .child(payload.uid)
      .set(
        {
          name: payload.name,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          bloodGroup: payload.bloodGroup
        },
        () => {
          res({
            key: payload.uid,
            name: payload.name,
            email: payload.email,
            phoneNumber: payload.phoneNumber,
            bloodGroup: payload.bloodGroup
          });
        }
      );
  });
}
export function getData(){
    return new Promise((res,rej)=>{
        fire.child('donors').once("value",(snapshot)=>{
            res(snapshotToArray(snapshot));
        })
    })
}


export function getOrders(user){
  return new Promise((res,rej)=>{
    console.log(user.uid);
    fire.child(`Restaurants/${user.uid}/Kitchen/Orders`).once("value",(snapshot)=>{
      res(snapshotToArray(snapshot))
    })
  })
}


export function getMenuData(user){
  return new Promise((res, rej)=>{
    fire.child(`Restaurants/${user.uid}/Menu`).once("value", (snapshot)=>{
      res(snapshotToArray(snapshot));
    })
  })
}

export function getTablesData(user){
  return new Promise((res, rej)=>{
    fire.child(`Restaurants/${user.uid}/Tables`).once("value", (snapshot)=>{
      res(snapshotToArray(snapshot));
    })
  })
}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val())
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

