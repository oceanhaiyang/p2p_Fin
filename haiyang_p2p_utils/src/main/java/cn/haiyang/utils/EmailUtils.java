package cn.haiyang.utils;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class EmailUtils {
	
	//后台服务器地址：
	//private static String domainName="/config/EmailAuthentication.properties";
	//后台服务器地址
	private static String backgroundUrl="/config/config.properties";
	
	public  Properties getProperties() throws IOException {
		Properties ip = new Properties();  
		try {
			InputStream url=getClass().getResourceAsStream(backgroundUrl);
			ip.load(url); 
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return ip;
	}
	
	public  Properties getBackgroundUrl() throws IOException {
		Properties p = new Properties();  
		try {
			InputStream in=getClass().getResourceAsStream(backgroundUrl);
			p.load(in); 
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}   
		return p;
	}
	/**
	 * 验证邮箱
	 * 
	 * @param email  用户邮箱
	 * @return
	 */
	public static boolean checkEmail(String email) {
		boolean flag = false;
		try {
			String check = "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
			Pattern regex = Pattern.compile(check);
			Matcher matcher = regex.matcher(email);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	
	/**
	 * 	邮件内容
	 * @param email 用户邮箱号
	 * @param enc 加密后的用户Id
	 * @return    返回邮箱类容
	 */
	public static String getMailCapacity(String email,String enc,String username){
		
		try {
			if(!(StringUtils.isEmpty(email.trim()) && StringUtils.isEmpty(enc.trim()) && StringUtils.isEmpty(username.trim()))){
				StringBuffer sb = new StringBuffer();
				sb.append("亲爱的"+username+",您好!");
				sb.append("<br>");
				sb.append("</br>");
				sb.append("感谢您注册，您登录的邮箱帐号为  "+email);
				sb.append("<br>");
				sb.append("</br>");
				sb.append("请点击下面的链接即可完成激活。");
				sb.append("<br>");
				sb.append("</br>");
				String url = getUrl("home.url");
				sb.append("<a href=\""+url+enc); //服务器路径 
				sb.append("\">");
				sb.append(url+enc);// 服务器路径
				sb.append("</a>");
				System.out.println(sb.toString());
				return sb.toString();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}	
		return "";
	}
	/**
	 * 获取properites 文件中的值
	 * @param key 
	 * @return
	 * @throws IOException
	 */
	public static String getUrl(String key) throws IOException{
		Properties props = new EmailUtils().getProperties();
		String path = props.getProperty(key);
		return path;
	}	
	
}
