package cn.haiyang.utils.excelUtil;

public class ExcleAddress {
	public static final String[] EXCEL_COLUMN= {"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
	/**
	 * 方法描述：计算excel 坐标位置
	 * 作者：liaoyu
	 * @param row  行   0 表示第一行 
	 * @param column 0表示excel 第1列 对应 A
	 * @return
	 * String
	 */
	public static String getAddress(int row,int column){
		//计算行
		int rec = column/26;
		if(rec==0) return ""+EXCEL_COLUMN[column]+(row+1);
		
		return ""+EXCEL_COLUMN[rec-1] +EXCEL_COLUMN[column%26]+(row+1);
		
	}
	
//	public static void main(String[] args) {
//		String a = getAddress(6,53);
//		System.out.println(a);
//	}
}
