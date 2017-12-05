package cn.haiyang.utils;

import org.apache.commons.lang.StringUtils;

public class Response {

	/**
	 * Response 消息
	 */
	private String message;

	/**
	 * Response 状态码
	 */
	private String status;

	/**
	 * Response 数据
	 */
	private Object data;

	/**
	 * 通话令牌
	 */
	private String token;

	private String index;
	private String total;
	private String persize;
	private String totalPages;
	private String uuid;
	private String phoneVCode;

	/**
	 * public static void main(String[] args) {
	 * 
	 * Response re = new Response(); re.setData("data").setStatus("status");
	 * 
	 * List<Response> list = new ArrayList<Response>(); list.add(re);
	 * list.add(re);
	 * 
	 * String result =
	 * 
	 * Response.build().setStatus("200").setData(new Date()).toJSON();
	 * 
	 * System.out.println(result);
	 * 
	 * }
	 */

	public static Response build() {
		return new Response();
	}

	public String toJSON() {

		StringBuffer sb = new StringBuffer();
		sb.append("{");

		if (StringUtils.isNotBlank(this.status)) {
			sb.append("\"status\":\"").append(status).append("\",");
		}
		if (StringUtils.isNotBlank(this.message)) {
			sb.append("\"message\":\"").append(message).append("\",");
		}
		if (StringUtils.isNotBlank(this.token)) {
			sb.append("\"token\":\"").append(token).append("\",");
		}
		if (StringUtils.isNotBlank(this.uuid)) {
			sb.append("\"uuid\":\"").append(uuid).append("\",");
		}
		if (StringUtils.isNotBlank(this.phoneVCode)) {
			sb.append("\"phoneVCode\":\"").append(phoneVCode).append("\",");
		}
		if (this.data != null) {
			JsonMapper jm = new JsonMapper();
			sb.append("\"data\":").append(jm.toJson(data)).append(",");
		}
		if (StringUtils.isNotBlank(this.index)) {
			sb.append("\"index\":\"").append(index).append("\",");
		}
		if (StringUtils.isNotBlank(this.total)) {
			sb.append("\"total\":\"").append(total).append("\",");
		}
		if (StringUtils.isNotBlank(this.persize)) {
			sb.append("\"persize\":\"").append(persize).append("\",");
		}
		if (StringUtils.isNotBlank(this.totalPages)) {
			sb.append("\"totalPages\":\"").append(totalPages).append("\",");
		}

		sb.append("}");
		String result = sb.toString();
		if (result.lastIndexOf(",") == -1) {
			return result;
		}
		return result.substring(0, result.lastIndexOf(",")).concat(result.substring(result.lastIndexOf(",") + 1));
	}

	public String toJSON(String withEmptyStr) {
		StringBuffer sb = new StringBuffer();
		sb.append("{");

		if (StringUtils.isNotBlank(this.status)) {
			sb.append("\"status\":\"").append(status).append("\",");
		}
		if (StringUtils.isNotBlank(this.message)) {
			sb.append("\"message\":\"").append(message).append("\",");
		}
		if (StringUtils.isNotBlank(this.token)) {
			sb.append("\"token\":\"").append(token).append("\",");
		}
		if (StringUtils.isNotBlank(this.uuid)) {
			sb.append("\"uuid\":\"").append(uuid).append("\",");
		}
		if (StringUtils.isNotBlank(this.phoneVCode)) {
			sb.append("\"phoneVCode\":\"").append(phoneVCode).append("\",");
		}
		if (this.data != null) {
			JsonMapper jm = new JsonMapper();
			sb.append("\"data\":").append(jm.toJsonWithEmptyStr(data)).append(",");
		}
		if (StringUtils.isNotBlank(this.index)) {
			sb.append("\"index\":\"").append(index).append("\",");
		}
		if (StringUtils.isNotBlank(this.total)) {
			sb.append("\"total\":\"").append(total).append("\",");
		}
		if (StringUtils.isNotBlank(this.persize)) {
			sb.append("\"persize\":\"").append(persize).append("\",");
		}
		if (StringUtils.isNotBlank(this.totalPages)) {
			sb.append("\"totalPages\":\"").append(totalPages).append("\",");
		}

		sb.append("}");
		String result = sb.toString();
		return result.substring(0, result.lastIndexOf(",")).concat(result.substring(result.lastIndexOf(",") + 1));

	}

	public String getStatus() {
		return status;
	}

	public Response setStatus(String status) {
		this.status = status;
		return this;
	}

	public Object getData() {
		return data;
	}

	public Response setData(Object data) {
		this.data = data;
		return this;
	}

	public String getIndex() {
		return index;
	}

	public Response setIndex(String index) {
		this.index = index;
		return this;
	}

	public String getTotal() {
		return total;
	}

	public Response setTotal(String total) {
		this.total = total;
		return this;
	}

	public String getPersize() {
		return persize;
	}

	public Response setPersize(String persize) {
		this.persize = persize;
		return this;
	}

	public String getTotalPages() {
		return totalPages;
	}

	public Response setTotalPages(String totalPages) {
		this.totalPages = totalPages;
		return this;
	}

	public String getMessage() {
		return message;
	}

	public Response setMessage(String message) {
		this.message = message;
		return this;
	}

	public String getToken() {
		return token;
	}

	public Response setToken(String token) {
		this.token = token;
		return this;
	}

	public String getUuid() {
		return uuid;
	}

	public Response setUuid(String uuid) {
		this.uuid = uuid;
		return this;
	}

	public String getPhoneVCode() {
		return phoneVCode;
	}

	public Response setPhoneVCode(String phoneVCode) {
		this.phoneVCode = phoneVCode;
		return this;
	}

}
