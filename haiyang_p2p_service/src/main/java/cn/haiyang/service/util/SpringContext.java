package cn.haiyang.service.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
/**
 * 类描述：从Spring容器中拿bean的工具类 
 * 此工具用于在非Spring容器管理的Java-bean中 获得由Spring容器管理的bean的实例
 */
public class SpringContext implements BeanFactoryAware {
	private static BeanFactory beanFactory = null;
	private static SpringContext springContext = null;
	
	@SuppressWarnings("static-access")
	@Override
	public void setBeanFactory(BeanFactory bf) throws BeansException  {
		this.beanFactory = bf;
	}
	
	/**
	 * 方法描述：从Spring容器中获得实例
	 * @return SpringContext
	 */
	public static SpringContext getInstance(){
		if(springContext==null) {
			return (SpringContext) beanFactory.getBean("springContext");
		}
		return springContext;
	}
	
	/**
	 * 方法描述：从Spring容器中获得bean
	 * @param beanName
	 * @return  Object
	 */
	public Object getBean(String beanName){
		return beanFactory.getBean(beanName);
	}
	
}
