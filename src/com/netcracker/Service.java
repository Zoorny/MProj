package com.netcracker;

import com.netcracker.Objects.Album;
import com.netcracker.Objects.Artist;
import com.netcracker.Objects.User;

import java.util.List;

public interface Service {

    void addArtist(Artist artist);
    Artist getArtistById(int id);
    List<Artist> getAllArtists();
    void deleteArtistById(int id);

    Album getAlbumById(int id);
    List<Album> getAlbums();

    void saveUser(User user);
    User findUserByUsername(String username);

}
