const fortunes = [
  "Fortune favors the brave",
  "You will be met by a pleasant stranger",
  "Don't look behind you",
  "The answer is 42",
  "Confucius is a wise man",
];

const twilioConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic QUNhZTM3ODhhMzhjZGY2ZDlmYTdkMGU2YzVlZGEwZWFkYzpmOGZkNTgxZDg4YWYyYjk3NTYwZDFjNGQ5YjMyM2QwMA==",
  },
};

document.getElementById("complimentButton").onclick = function () {
  axios.get("http://localhost:4000/api/compliment/").then(function (response) {
    const data = response.data;
    alert(data);
  });
};

document.getElementById("fortuneButton").onclick = function () {
  axios.get("http://localhost:4000/api/fortune/").then(function (response) {
    const data = response.data;
    alert(data);
  });
};

const addFortune = (e) => {
  e.preventDefault();
  //   console.log(e.target);
  //   console.log(document.getElementById("fortune-text").value);
  const fortune = {
    data: document.getElementById("fortune-text").value,
  };
  //   console.log(fortune);
  axios
    .post("http://localhost:4000/api/fortune/", fortune)
    .then((res) => {
      listFortunes();
      alert(res.data);
    })
    .catch((err) => console.log(err.data));
  document.getElementById("fortune-text").value = "";
};

const deleteFortune = (e) => {
  e.preventDefault();

  axios
    .delete("http://localhost:4000/api/fortune/")
    .then((res) => {
      listFortunes();
      alert(res.data);
    })
    .catch((err) => console.log(err.data));
};

const listFortunes = () => {
  document.getElementById("fortune-list").innerHTML = "";
  axios
    .get("http://localhost:4000/api/fortune/all")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const single = document.createElement("li");
        single.textContent = res.data[i];
        document.getElementById("fortune-list").appendChild(single);
      }
    })
    .catch((err) => console.log(err.data));
};

const updateFortune = (e) => {
  e.preventDefault();
  const number = document.getElementById("fortune-number");
  const updateText = document.getElementById("update-text");
  const data = {
    number: number.value,
    Text: updateText.value,
  };
  //   console.log(data);
  axios
    .put("http://localhost:4000/api/fortune/", data)
    .then((res) => {
      alert(res.data);
      listFortunes();
    })
    .catch((err) => console.log(err.data));

  number.value = "";
  updateText.value = "";
};

const sendText = (e) => {
  e.preventDefault();
  //   alert("hello");
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];
  const phoneNumber = document.getElementById("phone-number").value;
  let data = new URLSearchParams();
  data.append("To", "+1" + phoneNumber);
  data.append("From", "+13852170075");
  data.append("Body", randomFortune);
  //   console.log(phoneNumber);
  //   console.log(randomFortune);
  axios
    .post(
      "https://api.twilio.com/2010-04-01/Accounts/ACae3788a38cdf6d9fa7d0e6c5eda0eadc/Messages.json",
      data,
      twilioConfig
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.data));

  alert("Message Sent! We texted you from (385) 217-0075");
};

document.getElementById("submit-fortune").addEventListener("click", addFortune);

document
  .getElementById("delete-submission")
  .addEventListener("click", deleteFortune);

document
  .getElementById("listFortunesButton")
  .addEventListener("click", listFortunes);

document
  .getElementById("update-submission")
  .addEventListener("click", updateFortune);

document.getElementById("send-text").addEventListener("click", sendText);
