package cn.haiyang.dao.city;

import cn.haiyang.domain.city.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CityDao extends JpaRepository<City,Integer> {
    List<City> findByParentCityAreaNumIsNull();

    @Query("select c from City c where c.parentCityAreaNum=?1")
    List<City> findByParentCityAreaNum(String cityAreaNum);
}
