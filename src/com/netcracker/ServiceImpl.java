package com.netcracker;

import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceImpl implements Service {

    @Autowired
    private OracleDAO oracleDAO;

    public void addArtist(Artist artist) {
        oracleDAO.addArtist(artist);
    }

    public Artist getArtistById(int id) {
        return oracleDAO.getArtistById(id);
    }

    public List<Artist> getAllArtists() {
        return oracleDAO.getAllArtists();
    }

    public void deleteArtistById(int id) {
        oracleDAO.deleteArtistById(id);
    }

    public Album getAlbumById(int id) {
        return oracleDAO.getAlbumById(id);
    }

    public List<Album> getAlbums() {
        return oracleDAO.getAlbums();
    }
}
