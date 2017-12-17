package cn.haiyang.utils;

import java.security.MessageDigest;

public class MD5Util {
	
	private static final String encryModel="MD5";
	/**
     * 32λmd5.
     * @param str
     * @return
     */
    public  static String md5(String str) {
        return encrypt(encryModel, str);
//    	  return md5encrypt(str);
    }

    /**
     * md5家吗
     * 方法描述：   
     * 修改备注：   
     * @version 1.0
     * @param algorithm
     * @param str
     * @return    
     * 返回类型
     */
    public static String encrypt(String algorithm, String str) {
        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            md.update(str.getBytes());
            StringBuffer sb = new StringBuffer();
            byte[] bytes = md.digest();
            for (int i = 0; i < bytes.length; i++) {
                int b = bytes[i] & 0xFF;
                if (b < 0x10) {
                    sb.append('0');
                }
                sb.append(Integer.toHexString(b));
            }
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }
    
    /**
     * 可解密的md5加密
     * 方法描述：   
     * 修改备注：   
     * @version 1.0
     * @param str
     * @return    
     * 返回类型
     */
    public static String md5encrypt(String str) {
    	
    	char[] a = str.toCharArray();
    	for (int i = 0; i < a.length; i++) {
    		a[i] = (char) (a[i] ^ 't');
    	}
    	String md5 = new String(a);
    	
		return md5;
    	
    }
    
    /**
     * md5解密
     * 方法描述：   
     * 修改备注：   
     * @version 1.0
     * @param str
     * @return    
     * 返回类型
     */
    public static String convertMD5(String str) {
    	
    	char[] a = str.toCharArray();  
        for (int i = 0; i < a.length; i++){  
            a[i] = (char) (a[i] ^ 't');  
        }  
        String s = new String(a);  
        return s;
    	
    }
    
    public static void main(String[] args) {
    	System.out.println(convertMD5("EFG@AB"));
//    	System.out.println(md5("123456"));
//		System.out.println(md5("javausernameqq1234qq5678"));
	}

}
