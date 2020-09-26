interface Service {
  _id: String;
  name: String;
  token: String;
}

interface Flow {
  _id: String;
  name: String;
  services: String[];
}

export interface UserInterface {
  _id: String;
  email: String;
  services: Service[];
  flows: Flow[];
}
