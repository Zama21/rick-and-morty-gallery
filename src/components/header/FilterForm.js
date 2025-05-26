import { optionsGender, optionsSpecies, optionsStatus } from 'constants';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import { Button, Select, TextInput } from 'common';
import { useData } from 'components/providers';
import { API_URL } from 'constants/api';

export const FilterForm = () => {
  const { setApiURL, setActivePage } = useData();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setName(params.get('name') || '');
    setStatus(params.get('status') || '');
    setSpecies(params.get('species') || '');
    setType(params.get('type') || '');
    setGender(params.get('gender') || '');

    if (params.toString()) {
      const apiParams = new URLSearchParams(params);
      apiParams.set('page', 1);

      setApiURL(`${API_URL}?${apiParams.toString()}`);
      setActivePage(0);
    }
  }, [setActivePage, setApiURL]);

  const constructApiUrl = useCallback(() => {
    const params = new URLSearchParams();

    if (name.trim() !== '') params.set('name', name.trim());
    if (status !== '') params.set('status', status.toLowerCase());
    if (species !== '') params.set('species', species.toLowerCase());
    if (type.trim() !== '') params.set('type', type.trim());
    if (gender !== '') params.set('gender', gender.toLowerCase());

    if (params.toString())
      return `${window.location.origin}/?${params.toString()}`;

    return `${window.location.origin}/`;
  }, [name, status, species, type, gender]);

  const onApply = useCallback(() => {
    const newUrl = constructApiUrl();
    window.history.pushState({}, '', newUrl);
    setApiURL(
      `${API_URL}?${new URLSearchParams({
        name,
        status,
        species,
        type,
        gender,
        page: 1
      }).toString()}`
    );
    setActivePage(0);
  }, [
    constructApiUrl,
    setApiURL,
    name,
    status,
    species,
    type,
    gender,
    setActivePage
  ]);

  const onChangeName = useCallback((val) => setName(val), []);
  const onChangeStatus = useCallback((val) => setStatus(val), []);
  const onChangeSpecies = useCallback((val) => setSpecies(val), []);
  const onChangeType = useCallback((val) => setType(val), []);
  const onChangeGender = useCallback((val) => setGender(val), []);

  const onReset = useCallback(() => {
    setName('');
    setStatus('');
    setSpecies('');
    setType('');
    setGender('');
    const newUrl = `${window.location.origin}/`;

    window.history.pushState({}, '', newUrl);
    setApiURL(`${API_URL}`);
    setActivePage(0);
  }, [setActivePage, setApiURL]);

  return (
    <StyledContainerForm>
      <Select
        options={optionsStatus}
        value={status}
        onChange={onChangeStatus}
        placeholder="Status"
      />
      <Select
        options={optionsGender}
        value={gender}
        onChange={onChangeGender}
        placeholder="Gender"
      />
      <Select
        options={optionsSpecies}
        value={species}
        onChange={onChangeSpecies}
        placeholder="Species"
      />
      <TextInput onChange={onChangeName} value={name} placeholder="Name" />
      <TextInput onChange={onChangeType} value={type} placeholder="Type" />
      <StyledWrapperBtn>
        <Button onClick={onApply}>Apply</Button>
        <Button color={colors.danger} onClick={onReset}>
          Reset
        </Button>
      </StyledWrapperBtn>
    </StyledContainerForm>
  );
};

const StyledContainerForm = styled.div`
  display: flex;
  width: 240px;
  flex-direction: column;
  gap: 15px;

  @media (min-width: 950px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 561px;
  }

  @media (min-width: 1520px) {
    gap: 10px;
  }
`;

const StyledWrapperBtn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media (min-width: 950px) {
    flex-direction: row;
  }
`;
