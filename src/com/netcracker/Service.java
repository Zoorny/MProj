package com.netcracker;

import com.netcracker.Objects.Artist;

import java.util.List;

public interface Service {

    void addArtist(Artist artist);
    Artist getArtistById(int id);
    List<Artist> getAllArtists();
    void deleteArtistById(int id);

}
