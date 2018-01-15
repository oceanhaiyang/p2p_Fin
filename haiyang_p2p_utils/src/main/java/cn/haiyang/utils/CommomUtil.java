package cn.haiyang.utils;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class CommomUtil {
	/*
	 * 手机效验
	 * 正确 true
	 * 错误 false
	 */
	public static boolean isMobile(String mobiles) {

		Pattern p = Pattern.compile("^1[3|4|5|7|8]\\d{9}$");
		//^(1(([35][0-9])|(47)|[8][01236789]))[0-9]{8}$
		//"^1[3578]\\d{9}$"
		Matcher m = p.matcher(mobiles);
		return m.matches();

	}
	
	/*
	 * 手机格式校验（11位）
	 * 正确 true
	 * 错误 false
	 */
	public static boolean isPhone(String mobiles) {

		Pattern p = Pattern.compile("1[3|5|7|8|][0-9]{9}");
		Matcher m = p.matcher(mobiles);
		return m.matches();

	}
	

	
	/*
	 * 纯数字效验
	 * 		
	 * 纯数字 true
	 * 非纯数字 false
	 */
	 public static boolean isNumber(String str)
	    {
	        Pattern pattern= Pattern.compile("[0-9]*");
	        Matcher match=pattern.matcher(str);
	        return match.matches();
	    }
	
	/*
	 *  6位纯数字效验
	 *   
	 *  纯数字 true 
	 *  非纯数字 false
	 */
		 public static boolean isNumberSix(String str)
		    {
		        Pattern pattern= Pattern.compile("^[0-9]{6}");
		        Matcher match=pattern.matcher(str);
		        return match.matches();
		    }
	/*
	 *  6位纯数字效验
	 *   
	 *  纯数字 true 
	 *  非纯数字 false
	 */
		public static boolean isNumberSixToEleven(String str)
			{
			 Pattern pattern= Pattern.compile("^[0-9]{6,11}");
			 Matcher match=pattern.matcher(str);
			 return match.matches();
				    }
				 
		 /*
			 *  数字字母效验
			 *   
			 *  通过 true 
			 *  不通过 false
			 */
		public static boolean isNumberLetter(String str) {
			if (Pattern.matches("^[0-9A-Za-z]{8,16}$", str)) {         //)[0-9A-Za-z]{6,16}$
				return true;
			} else {
				return false;
			}
		}
		
		/**
		 * 数字字母校验(6-16)
		 * @param str
		 * @return
		 */
		public static boolean NumberLetter(String str) {
			if (Pattern.matches("^[0-9A-Za-z]{6,16}$", str)) {         //)[0-9A-Za-z]{6,16}$
				return true;
			} else {
				return false;
			}
		}
		
		/*
		 * 只能输入汉字，长度不限
		 * 李贝贝
		 */
		public static boolean ischinese(String str) {
			if (Pattern.matches("^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", str)) {        
				return true;
			} else {
				return false;
			}
		}
		

		
		/*
		 * 数字字母下划线
		 * 
		 */
		public static boolean isRegular(String str) {
			if (Pattern.matches("[A-Za-z0-9_\u4E00-\u9FFF]+", str)) {         //)[0-9A-Za-z]{6,16}$
				return true;
			} else {
				return false;
			}
		}



		
		/*
		 * 全部是数字，小数点后最多有两位  
		 * 只能是数字，可以为整数形式，也可以是小数点后两位的形式；无位数限制
		 * 
		 * 
		 */
		public static boolean isDoubleNumber(String num) {

			
			if (Pattern.matches("(^[1-9][\\d]*(.[\\d]{1,2})?)|([0][\\.][\\d]{1,2})", num)) {        
				return true;
			} else {
				return false;
			}
		}
		
		/*
		 * 只有0或1
		 * 
		 */
		public static boolean isGender(String num) {
			if (Pattern.matches("[0-1]{1}", num)) {        
				return true;
			} else {
				return false;
			}
		}
		

	

		 /*
	public static void main(String[] args){  
		  
	 System.out.println(CommomUtil.ischinese("qq外企1")); 
		  
	}  
	*/


	
		
//		public static void main(String[] args){  
//			  
//		 System.out.println(CommomUtil.isUsername("外企")); 
//			  
//		}  
		

	/*
	 * 用户名汉子英文数字
	 * 王灿
	 */
	public static boolean isAccounttitle(String str) {
		if (Pattern.matches("[\u4e00-\u9fa5a-zA-Z-0-9]+", str)) { 
			return true;
		} else {
			return false;
		}
	}
	/*
	 * 用户姓名汉子数字
	 * 王灿
	 */
	public static boolean isUsername(String str) {
		if (Pattern.matches("[\u4e00-\u9fa5a]+", str)) { 
			return true;
		} else {
			return false;
		}
	}
	/*
	 * 密码英文数字
	 * 王灿
	 */
	public static boolean isPassword(String str) {
		if (Pattern.matches("[A-Za-z0-9]+", str)) { 
			return true;
		} else {
			return false;
		}
	}
		
	/**
	 * 身份证编码校验
	 * @param idCard 校验身份证对象
	 * @return  不合法:true 合法:false
	 */
	public static boolean isIdCardCheck(String idCard) {
		if (!StringUtils.isEmpty(idCard) && Pattern.matches("\\d{15}|\\d{18}",idCard)) {
			return true;
		}
		return false;
	}
	
	/**
	 * 获取字符串的后3位
	 * @param token
	 * @return
	 */
	public static String getString(String token){
		 Random r=new Random();
		 int nextInt = r.nextInt(500);
		StringBuffer sb=new StringBuffer(token);
		StringBuffer sb2=new StringBuffer();
		sb.reverse();
		String b="";
		for(int i=0;i<3;i++){
			sb2.append(sb.charAt(i));
		}
		sb2.append(nextInt);
		b=String.valueOf(sb2);
		return b;
	}
	
	public static String getStringKey(String token){
		
		StringBuffer sb=new StringBuffer(token);
		StringBuffer sb2=new StringBuffer();
		sb.reverse();
		String b="";
		for(int i=0;i<6;i++){
			sb2.append(sb.charAt(i));
		}
		
		b=String.valueOf(sb2);
		return b;
	}
	
	public static double getjj(){
		String s="3";
		Double valueOf = Double.valueOf(s);
		return valueOf;
		
	}
	
	
	public static void main(String[] args) {
		String getjj = getStringKey("gfgfdhhhjrftfghhhh");
		System.out.println(getjj);
	}
}
