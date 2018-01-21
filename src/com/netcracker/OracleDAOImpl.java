package com.netcracker;

import com.netcracker.Mappers.ArtistMapper;
import com.netcracker.Objects.Artist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class OracleDAOImpl implements OracleDAO {


    private JdbcTemplate jdbcTemplate;

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public void addArtist(Artist artist) {
        String sql = "insert into \"artists\" (\"artist_id\", \"artist_name\", \"artist_desc\") values (?,?,?)";
        jdbcTemplate.update(sql, new Object[]{artist.getId(), artist.getName(), artist.getDescription()});
    }

    public Artist getArtistById(int id) {
        String sql = "select * from \"artists\" where \"artist_id\" = :id";
        Map<String, Object> namedParams = new HashMap<String, Object>();
        namedParams.put("id", id);
        return namedParameterJdbcTemplate.query(sql, namedParams, new ArtistMapper()).get(0);
    }

    public List<Artist> getAllArtists(){
        String sql = "SELECT * FROM \"artists\"";
        return namedParameterJdbcTemplate.query(sql, new ArtistMapper());
    }

    public void deleteArtistById(int id) {
        String sql = "delete from artists where artist_id = ?";
        jdbcTemplate.update(sql, new Object[]{id});
    }
}
