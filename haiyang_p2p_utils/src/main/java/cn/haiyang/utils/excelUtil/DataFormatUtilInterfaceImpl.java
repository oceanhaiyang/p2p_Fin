package cn.haiyang.utils.excelUtil;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 类描述：数据格式化实现类
 * 创建日期：2015年6月2日
 */
public class DataFormatUtilInterfaceImpl implements DataFormatUtilInterface {

	/** 传入null，返回0;
	 * 传入double，直接返回;
	 * 传入float 类型提升； 
	 * 传入BigDecimal：返回 doubleValue； 
	 * 传入String 返回parseDouble 
	 * 传入 byte int shot long 数据类型提升或转换 ； 
	 * 传入不可转换字符 抛出异常
	 */
	public double formatToDouble(Object value,Integer column) {
		if(value==null) return 0;
		if(value instanceof BigDecimal) {
			return ((BigDecimal)value).doubleValue();
		}
		String data = String.valueOf(value);
		if(value instanceof Float
			||value instanceof Double
			||value instanceof Byte 
			||value instanceof Short
			||value instanceof Integer
			||value instanceof Long){
			return Double.parseDouble(data);
		}
		if(value instanceof String){
			if(null==data||"".equals(data)) data = "0";
			Double db =null;
			try {//当value 是String类型时
				db = Double.parseDouble(data);
				return db;
			} catch (NumberFormatException e) {
//			e.printStackTrace();
					throw new ExcelDataFormatException("数据转换异常:"+value.toString(),column, e);
			}
		}
			throw new ExcelDataFormatException("不能被转换的类："+value.getClass(),column);
	}
	/** 方法描述：将可转换为数值的数据转换成int类型 作者：liaoyu
	 * 传入double,float,Long,先转换成BigDecimal，取intvalue 精度和值会损失；
	 * 传入BigDecimal：返回 intValue； 
	 * 传入String 返回parseInt 
	 * 传入 byte shot int 数据类型提升或直接返回； 
	 * 传入不可转换字符 抛出异常
	 */
	public int formatToInt(Object value,Integer column) {
		if(value==null)return 0;
		String data = String.valueOf(value);
		if(value instanceof BigDecimal) {
			return ((BigDecimal)value).intValue();
		}
		if(value instanceof Float
			||value instanceof Double
			||value instanceof Long){
			BigDecimal big = new BigDecimal(data);
			return big.intValue();
		}
		if( value instanceof Byte 
			||value instanceof Short
			||value instanceof Integer){
			return Integer.valueOf(data);
		}
		if(value instanceof String){
			if(null==data||"".equals(data)) data = "0";
			try {//当value 是String类型时
				return new BigDecimal(data).intValue();
			} catch (NumberFormatException e) {
//			e.printStackTrace();
				throw new ExcelDataFormatException("数据转换异常:"+value.toString(),column, e);
			}
		}
		 throw new ExcelDataFormatException("不能被转换的类："+value.getClass(),column);
	}
	/*
	 * timestemp 日期的毫秒数 传入timestemp时间类型为String类型时，
	 * 需要传入时间的毫秒数 返回 new Date(Long.valueOf(timestemp)) 
	 * 传入timestemp时间类型为Long类型时 返回 new Date(long timestemp) 
	 * 传入timestemp为Date （Java.util.date）直接返回 
	 * 传入timestemp为Java.sql.date时 返回 new Date(sql.date.Date.getTime()) 
	 * 传入timestemp为其他任何形式，或对象，将抛出异常
	 */
	public Date format(Object timestemp,Integer column) {
		if(timestemp==null) return null;
		if(timestemp instanceof String){
			Long time = 0L;
			try {
				time = Long.valueOf((String) timestemp);
			} catch (NumberFormatException e) {
				throw new ExcelDataFormatException("数字转换异常："+timestemp+" 不能转换成java.long.Long",column, e);
			}
			return new Date(time);
		}
		if(timestemp instanceof Long){
			return new Date((Long) timestemp);
		}
		if(timestemp instanceof Date){
			return (Date) timestemp;
		}
		if(timestemp instanceof java.sql.Date){
			return new Date(((java.sql.Date)timestemp).getTime());
		}
		 throw new ExcelDataFormatException("不能被转换成java.util.Date的类："+timestemp.getClass(),column);
	}

	public String formatToDateString(String timestemp, String pattern,Integer column) {
		if(timestemp==null) return null;
		SimpleDateFormat sd =getFormat(pattern);
		
		Long time = 0L;
		try {
			time = Long.valueOf(timestemp);
		} catch (NumberFormatException e) {
			throw new ExcelDataFormatException("数字转换异常："+timestemp,column, e);
		}
		String date = sd.format(new Date(time));
		return date;
	}

	public String formatToDateString(Long timestemp, String pattern,Integer column) {
		if(timestemp==null) return null;
		SimpleDateFormat sd =getFormat(pattern);
		return sd.format(new Date(timestemp));
	}

	public static SimpleDateFormat getFormat(String pattern){
		if(pattern==null) throw new ExcelDataFormatException("pattern 不能为空");
		return new SimpleDateFormat(pattern);
	}
	
	public long formatToLong(Object value,Integer column) {
		if(value==null) return 0;
		if(value instanceof BigDecimal) {
			return ((BigDecimal)value).longValue();
		}
		String data = String.valueOf(value);
		if( value instanceof Byte 
			||value instanceof Short
			||value instanceof Integer
			||value instanceof Long){
			return Long.parseLong(data);
		}
		if( value instanceof Float
			||value instanceof Double){
			return new BigDecimal(data).longValue();
		}
		if(value instanceof String){
			if(null==data||"".equals(data)) data = "0";
			try {//当value 是String类型时
				return  new BigDecimal(data).longValue();
			} catch (NumberFormatException e) {
				throw new ExcelDataFormatException("数据转换异常:"+value.toString()+ " 不能转换成java.lang.Long",column, e);
			}
		}
		 throw new ExcelDataFormatException("不能被转换成java.lang.Long的类："+value.getClass(),column);
	}
	
	public double formatToDouble(Object value) {
		
		return formatToDouble(value,null);
	}
	public int formatToInt(Object value) {
		
		return formatToInt(value,null);
	}
	public long formatToLong(Object value) {
		return formatToLong(value,null);
	}
	public Date format(Object timestemp) {
		return format(timestemp,null);
	}
	public String formatToDateString(String timestemp, String patten) {
		return formatToDateString(timestemp,patten,null);
	}
	public String formatToDateString(Long timestemp, String patten) {
		return formatToDateString(timestemp,patten,null);
	}
	
}
