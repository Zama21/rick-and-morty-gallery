import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { API_EPISODES_URL } from 'constants';
import { useFetch } from 'hooks';
import { Loader, Text } from 'common';

export function PopupEpisodes({ episodes }) {
  const [episodeIds, setEpisodeIds] = useState([]);
  const { data: series, isLoading, error } = useFetch(
    episodeIds.length > 0 ? `${API_EPISODES_URL}/${episodeIds.join(',')}` : null
  );

  useEffect(() => {
    if (!episodes?.length) return;

    const ids = episodes.map((ep) => ep.match(/\d+$/)[0]);
    setEpisodeIds(ids);
  }, [episodes]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const normalizedSeries = series
    ? Array.isArray(series)
      ? series
      : [series]
    : [];

  return (
    <PopupEpisodesContainer>
      <Text>Participated in episodes:</Text>

      <StyledPopupEpisodes _length={normalizedSeries?.length}>
        {normalizedSeries?.map(({ id, name, episode }) => (
          <Episode key={id}>
            <EpisodeMarking>
              {episode
                .replace(/S0?(\d+)/, 'Season $1 - ')
                .replace(/E0?(\d+)/, 'Ep. $1')}
            </EpisodeMarking>
            {name}
          </Episode>
        ))}
      </StyledPopupEpisodes>
    </PopupEpisodesContainer>
  );
}

const PopupEpisodesContainer = styled.div``;

const StyledPopupEpisodes = styled.div`
  display: flex;
  flex-direction: column;

  ${({ _length }) =>
    _length > 20 &&
    css`
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(
        ${window.screen.width < 600 ? _length : Math.ceil(_length / 2)},
        1fr
      );

      & p {
        width: 95%;
        border-bottom: 2px solid #eee;
      }

      & span {
        margin-bottom: ${window.screen.width < 600 ? '10px' : 0};
      }
    `};

  ${window.screen.width < 600 && 'grid-template-columns: 1fr'};
`;

const Episode = styled.p`
  width: 100%;
  display: grid;
  align-items: center;
  padding: 10px 0;
`;

const EpisodeMarking = styled.span`
  margin-bottom: 8px;
  color: #83bf46;
`;
