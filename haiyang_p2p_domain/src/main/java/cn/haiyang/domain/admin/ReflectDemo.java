package cn.haiyang.domain.admin;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class ReflectDemo {
	public static void main(String[] args) throws Exception {
		Class c = Class.forName("cn.haiyang.domain.admin.Person");
		
		Constructor con = c.getConstructor();
		Object obj = con.newInstance();//通过构造器创建对象
		Method m = c.getMethod("show");
		m.invoke(obj);//调用对象的方法
		
	}
}
