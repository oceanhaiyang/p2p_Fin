package cn.haiyang.domain.admin;

public class Person {
	String name;
	String weight;
	int age;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	
	public void show(){
		System.out.println("reflect,,,,");
	}
	@Override
	public String toString() {
		return "Person [name=" + name + ", weight=" + weight + ", age=" + age + "]";
	}
	
}
