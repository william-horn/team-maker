"use client";

import Image from 'next/image'

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
import Page from '@/components/Page';
import Content from '@/components/Content';
import Heading from '@/components/Typography/Heading';
import Text from '@/components/Typography/Text';

import connectMongoDB from '@/lib/db/mongodb-connect';
// import FoobarAPI, { Foobar } from '@/models/foobar/api';
import { StatelessButton } from '@/components/Buttons/Buttons';
import ButtonGroup from '@/components/Buttons/ButtonGroup';
import InputField from './InputField';
import { useLocalStorageRequest, useLocalStorageState } from '@/hooks/useLocalStorageRequest';

import { useRef, useState } from 'react';
import stringIsEmpty from '@/lib/utils/stringIsEmpty';
import shuffle from '@/lib/utils/shuffleArray';
import Enum from '@/enum';

const Home = function({
  
}) {
  const [getMembers, setMembers] = useLocalStorageState('members', []);
  const [getRandomTeam, setRandomTeam] = useLocalStorageState('randomTeam', []);

  const [getSittingTeam, setSittingTeam] = useLocalStorageRequest('lastSitting', []);
  const memberInput = useRef(null);
  const teamSizeInput = useRef(null);

  const addMember = () => {
    const newMember = memberInput.current.value;

    if (stringIsEmpty(newMember)) {
      return;
    }

    setMembers(prev => {
      if (prev.find(v => v === newMember)) {
        return prev;
      } else {
        prev.push(newMember);
      }
      return [...prev];
    })

    memberInput.current.blur();
  }

  const onEnter = event => {
    if (event.Key === Enum.Keys.Enter.value) {
      memberInput.current.value = '';
    }
  }

  const generateTeam = () => {
    const teamSize = teamSizeInput.current.value;

    if (getMembers().length < teamSize*2) {
      return;
    }

    const randTeam = shuffle(getMembers());

    const diff = randTeam.length - teamSize*2
    const active = randTeam.splice(diff);
    const sitting = randTeam.splice(0, diff);

    setSittingTeam(prev => {
      return sitting;
    });

    setRandomTeam(prev => {
      return active;
    });

    console.log(active);
    console.log(sitting);
  }
  
  return (
    <Page className="bg-primary">
      <Content span="xs" className='mx-auto mt-10'>
        <Heading textSize="3xl" className='my-3 text-center'>Team Maker</Heading>
        <Content span="" className="flex flex-col items-center mx-auto mt-10 mb-5">
          <div className='flex items-center justify-center'>
            <Content className="flex justify-center m-2 w-fit">
              <label className='mr-2'>Enter Members:</label>
              <input 
              onKeyUp={onEnter}
              ref={memberInput}
              type='text'
              className='bg-[#060606] p-1 rounded mr-2 min-w-[50px]'
              />
            </Content>
            <StatelessButton 
              onClick={addMember}
              className={{
                self: ' whitespace-nowrap h-fit'
              }}>
              + Add Member
            </StatelessButton>
          </div>

          <Content className="flex justify-center m-2 w-fit">
            <label className='mr-2'>Enter Team Size:</label>
            <input 
            ref={teamSizeInput}
            type='number'
            className='bg-[#060606] p-1 rounded mr-2 min-w-[50px]'
            />
          </Content>

          <Content className="flex items-center justify-center m-4">
            <label className='mr-2'>Repeat Sit-Outs</label>
            <ButtonGroup 
            
            defaultSelect={['no']}
            unselectLastChoice={true}
            selectionLimit={1}
            className={{
              self: 'flex flex-row'
              }}
            >
              <StatelessButton id='yes'>Yes</StatelessButton>
              <StatelessButton id='no'>No</StatelessButton>
            </ButtonGroup>
          </Content>

          <StatelessButton
          onClick={generateTeam}
          className={{
            self: 'bg-green-700 hover:bg-green-600'
          }}>
            Generate Team
          </StatelessButton>
        </Content>
      </Content>
      <Content span='lg' className='flex mx-auto'>
        <Content className='w-[50%]'>
          <h2 className='p-2 text-center text-green-500'>Members in Lobby:</h2>
          <Content className='flex justify-center'>
            <ul>
              {
                getMembers().map(member => {
                  return <li key={member} className='flex justify-center'>
                    <StatelessButton
                    onClick={
                      () => {
                        setMembers(prev => {
                          prev.filter((v, i, arr) => {
                            if (v === member) {
                              arr.splice(i, 1);
                            }
                          });
                          return [...prev];
                        });
                      }
                    } 
                    className={{
                      self: 'm-1 bg-black hover:bg-green-700 '
                    }}>
                      {member}
                    </StatelessButton>
                  </li>
                })
              }
            </ul>
          </Content>
        </Content>

        <Content className='w-[50%]'>
          <h2 className='p-2 text-center text-gray-600'>Sitting:</h2>
          <Content className='flex justify-center'>
            <ul>
              {
                getSittingTeam().map(member => {
                  return <li key={member}>{member}</li>
                })
              }
            </ul>
          </Content>
        </Content>

        <Content className='w-[50%]'>
          <h2 className='p-2 text-center text-blue-500'>Team Generated:</h2>
          <Content className='flex justify-center'>
            <ul>
              {
                getRandomTeam().map(member => {
                  return <li key={member}>{member}</li>
                })
              }
            </ul>
          </Content>
        </Content>
      </Content>
    </Page>
  )
}

export default Home;