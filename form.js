import './form.css';

const myFormElem = document.querySelector(".my-form");
const formOutput = document.querySelector(".form__json");
const submitBtn = myFormElem.querySelector(".btn-success");

const selectsList = ".form__selects";
const inputsList = ".form__inputs";

let myFormFields = [
  {
    tag: "select",
    name: "select-one",
    values: [
      { value: "", label: "Выбрать" },
      { value: "One", label: "One" },
      { value: "Two", label: "Two" },
      { value: "Three", label: "Three" },
      { value: "Four", label: "Four" },
      { value: "Five", label: "Five" },
    ],
  },
  {
    tag: "select",
    name: "select-two",
    values: [
      { value: "", label: "Выбрать" },
      { value: "One", label: "One" },
      { value: "Two", label: "Two" },
      { value: "Three", label: "Three" },
      { value: "Four", label: "Four" },
      { value: "Five", label: "Five" },
    ],
  },
  {
    tag: "select",
    name: "select-three",
    values: [
      { value: "", label: "Выбрать" },
      { value: "One", label: "One" },
      { value: "Two", label: "Two" },
      { value: "Three", label: "Three" },
      { value: "Four", label: "Four" },
    ],
  },
  {
    tag: "select",
    name: "select-four",
    values: [
      { value: "", label: "Выбрать" },
      { value: "One", label: "One" },
      { value: "Two", label: "Two" },
      { value: "Three", label: "Three" },
      { value: "Four", label: "Four" },
      { value: "Five", label: "Five" },
    ],
  },
  {
    tag: "select",
    name: "select-five",
    values: [
      { value: "", label: "Выбрать" },
      { value: "One", label: "One" },
      { value: "Two", label: "Two" },
      { value: "Three", label: "Three" },
      { value: "Four", label: "Four" },
      { value: "Five", label: "Five" },
    ],
  },
  {
    tag: "input",
    type: "text",
    name: "name",
    placeholder: "Enter your name",
  },
  {
    tag: "input",
    type: "text",
    name: "lastname",
    placeholder: "Enter your lastname",
  },
];

class Form {
  constructor(selector, handleInput) {
    this._selector = selector;
    this._selectsArea = this._selector.querySelector(selectsList);
    this._inputsArea = this._selector.querySelector(inputsList);
    this._handleInput = handleInput;
  }
  renderFields(arr) {
    arr.forEach((item) => {
      if (item.tag === `select`) {
        return this._generateSelect(item);
      }
      if (item.tag === `input`) {
        return this._generateInput(item);
      }
    });
  }
  _setEventListener(item) {
    item.addEventListener("input", this._handleInput);
  }
  _generateSelect(item) {
    this._selectEl = document.createElement("select");
    this._selectEl.name = item.name;
    this._selectEl.value = `Choose value`;
    this._selectEl.className = `form-select form__field`;
    item.values.forEach((i) => {
      this._option = document.createElement("option");
      this._option.value = i.value;
      this._option.innerText = i.label;
      return this._selectEl.append(this._option);
    });
    this._setEventListener(this._selectEl);
    return this._selectsArea.append(this._selectEl);
  }
  _generateInput(item) {
    this._inputEl = document.createElement("input");
    this._inputEl.type = item.type;
    this._inputEl.name = item.name;
    this._inputEl.placeholder = item.placeholder;
    this._inputEl.className = `form-control form__field`;
    this._setEventListener(this._inputEl);
    return this._inputsArea.append(this._inputEl);
  }
}

const MyForm = new Form(myFormElem, handleChange);
MyForm.renderFields(myFormFields);

function validateForm(data) {
  const formEntries = Array.from(data.entries());
  const isValid = !!formEntries.find((i) => i[1] === "");
  if (isValid) {
    submitBtn.setAttribute("disabled", true);
  } else {
    submitBtn.removeAttribute("disabled");
  }
}

function handleChange(e) {
  e.preventDefault();
  let data = getFormData(myFormElem);
  validateForm(data);
}

function sendData(data) {
  return sendRequest({
    method: "GET",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
}

function sendRequest({ method, headers, body }) {
  return body;
};

function getFormData(selector) {
  let data = serializeForm(selector);
  return data;
}

function serializeForm(formNode) {
  return new FormData(formNode);
}

function createJson(array) {
  let formJson = new Object();
  array.forEach((i) => {
    formJson[i[0]] = i[1];
  })
  return JSON.stringify(formJson);
}

function handleSubmit(e) {
  e.preventDefault();
  let data = getFormData(e.target);
  const formArray = Array.from(data.entries());
  const response = sendData(createJson(formArray));
  displayJson(response);
}

function displayJson(response) {
  myFormElem.reset();
  submitBtn.setAttribute("disabled", true);
  formOutput.innerText = response;
}

myFormElem.addEventListener("submit", handleSubmit);
