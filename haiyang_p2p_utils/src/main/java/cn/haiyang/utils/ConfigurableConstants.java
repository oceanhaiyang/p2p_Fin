package cn.haiyang.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
/**
 * 
 * 针对config.properties的配置文件读取类
 *
 */
public final class ConfigurableConstants {
	private static Log loger = LogFactory.getLog(ConfigurableConstants.class);

	private static Properties config_pro = new Properties();

	private static String propertyFileName = "config/config.properties";
	/**
	 * 静态读入属性文件到Properties p变量中
	 */
	static {
		// loger.debug("初始化配置文件" + propertyFileName + "到 Constants....");
		InputStream in = null;
		try {
			in = ConfigurableConstants.class.getClassLoader()
					.getResourceAsStream(propertyFileName);
			if (in != null) {
				config_pro.load(in);
			}
		} catch (IOException e) {
			loger.error("初始化配置文件 " + propertyFileName
			 + " 到 Constants 发生错误,请检查相关配置文件!" + e);
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					 loger.error("close " + propertyFileName + " error!");
				}
			}
		}
	}
	/**
	 * 
	 * 封装了Properties类的getProperty函数,使p变量对子类透明.
	 * 
	 * @param key
	 *            property key.
	 * @param defaultValue
	 *            当使用property key在properties中取不到值时的默认值.
	 * @return 属性值
	 */
	public static String getProperty(String key, String defaultValue) {
		if (config_pro.getProperty(key)== null) {
			return defaultValue;
			}else{
				return config_pro.getProperty(key);
			}
		
	}

	/**
	 * 
	 * 封装了Properties类的getProperty函数,使p变量对子类透明.
	 * 
	 * @param key
	 *            property key.
	 * @return 属性值
	 */
	public static String getProperty(String key) {
		return getProperty(key, null);
	}
}
