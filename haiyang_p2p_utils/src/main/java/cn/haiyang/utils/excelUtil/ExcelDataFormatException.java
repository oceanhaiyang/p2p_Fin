package cn.haiyang.utils.excelUtil;

public class ExcelDataFormatException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ExcelDataFormatException(String message, Throwable cause) {
		super(message, cause);
	}

	public ExcelDataFormatException(String message) {
		super(message);
	}
	public ExcelDataFormatException(String message,int column) {
		super(message+",错误位置：{"+column+"}");
	}
	public ExcelDataFormatException(String message,int column, Throwable cause){
		super(message+",错误位置：{"+column+"}", cause);
	}
	
	public ExcelDataFormatException(String message,String address, Throwable cause){
		super(message+",错误位置：{"+address+"}", cause);
	}
}
