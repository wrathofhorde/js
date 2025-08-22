class Department {
  constructor(private id: string, private name: string) {}

  descrition() {
    console.log(`${this.id}: ${this.name}`);
  }
}

const accouting = new Department("A1", "Accouting");
console.log(accouting);
accouting.descrition();
