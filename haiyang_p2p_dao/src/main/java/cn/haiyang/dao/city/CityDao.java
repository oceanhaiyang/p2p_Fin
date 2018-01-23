package cn.haiyang.dao.city;

import cn.haiyang.domain.city.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CityDao extends JpaRepository<City,Integer> {
    List<City> findByParentCityAreaNumIsNull();
}
