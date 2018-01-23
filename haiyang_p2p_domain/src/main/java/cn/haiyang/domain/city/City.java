package cn.haiyang.domain.city;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
* @ClassName: City
* @Description: 城市字典表
*
 */
@Entity
@Table(name="T_CITY")
public class City {
	  @Id
	  @GeneratedValue()
	  @Column(name="T_ID")
	  private Integer cityId;//城市表 主键
	  
	  @Column(name="T_CITY_AREA_NUM")
	  private String cityAreaNum;//城市编号
	  
	  @Column(name="T_CITY_NAME")
	  private String cityName;//城市名称
	  
	  @Column(name="T_CITY_LEVEL")
	  @JsonIgnore
	  private int cityLevel;//城市级别 (0：省 ；1：市；2：县)
	  
	  @Column(name="T_PARENT_CITY_NUM")
	  @JsonIgnore
	  private String parentCityAreaNum;//父级城市编号
	  
	  @Transient
	  @JsonIgnore
	  private City parent;
	  
	public Integer getCityId() {
		return cityId;
	}
	
	public void setCityId(Integer cityId) {
		this.cityId = cityId;
	}
	
	public String getCityAreaNum() {
		return cityAreaNum;
	}
	
	public void setCityAreaNum(String cityAreaNum) {
		this.cityAreaNum = cityAreaNum;
	}
	
	public String getCityName() {
		return cityName;
	}
	
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	
	public int getCityLevel() {
		return cityLevel;
	}
	
	public void setCityLevel(int cityLevel) {
		this.cityLevel = cityLevel;
	}
	
	public String getParentCityAreaNum() {
		return parentCityAreaNum;
	}
	
	public void setParentCityAreaNum(String parentCityAreaNum) {
		this.parentCityAreaNum = parentCityAreaNum;
	}
	
	public City getParent() {
		return parent;
	}
	
	public void setParent(City parent) {
		this.parent = parent;
	}
	
}
