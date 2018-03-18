/**
 * 
 */
package cn.haiyang.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;


public class RandomNumberUtil {
	public static String randomNumber(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		Random rd = new Random();  //一种方式  java.util.Random  
	    int random = 1000+rd.nextInt(8999);
	    String randomNO = sdf.format(date)+random;
		return randomNO;  
	}
}
