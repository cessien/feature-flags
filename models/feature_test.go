package models

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestEnabled(t *testing.T) {
	f := FeatureFlag{
		Key:        "foo",
		Enabled:    true,
		Users:      []string{},
		Groups:     []string{},
		Percentage: 20,
	}

	assert.True(t, f.IsEnabled())
	assert.False(t, f.IsPartiallyEnabled())

	// Disable the feature
	f.Enabled = false

	assert.False(t, f.IsEnabled())
	assert.True(t, f.IsPartiallyEnabled())
}

func TestValidate(t *testing.T) {
	f := FeatureFlag{
		Key:        "foo",
		Enabled:    false,
		Users:      []string{},
		Groups:     []string{},
		Percentage: 101,
	}

	err := f.Validate()
	assert.NotNil(t, err)
	assert.Equal(t, "Percentage must be between 0 and 100", err.Error())

	f.Percentage = 50
	f.Key = "ab"
	err = f.Validate()
	assert.NotNil(t, err)
	assert.Equal(t, "Feature key must be between 3 and 50 characters", err.Error())

	f.Key = "a&6"
	err = f.Validate()
	assert.NotNil(t, err)
	assert.Equal(t, "Feature key must only contain digits, lowercase letters and underscores", err.Error())

	f.Key = "foo"
	assert.Nil(t, f.Validate())
}

func TestPartiallyEnabled(t *testing.T) {
	f := FeatureFlag{
		Key:        "foo",
		Enabled:    false,
		Users:      []string{},
		Groups:     []string{},
		Percentage: 20,
	}

	assert.True(t, f.IsPartiallyEnabled())

	f.Percentage = 0
	f.Groups = []string{"a"}
	assert.True(t, f.IsPartiallyEnabled())

	f.Groups = []string{}
	f.Users = []string{"parrot"}
	assert.True(t, f.IsPartiallyEnabled())

	f.Percentage = 100
	assert.False(t, f.IsPartiallyEnabled())
	assert.True(t, f.IsEnabled())
}

func TestHasDescription(t *testing.T) {
	f := FeatureFlag{
		Key:         "foo",
		Description: "this is a desc of the feat",
		Enabled:     false,
		Users:       []string{"mark"},
		Groups:      []string{"bar"},
		Percentage:  25,
	}

	assert.True(t, f.hasDescription())
}

func TestGroupHasAccess(t *testing.T) {
	f := FeatureFlag{
		Key:        "foo",
		Enabled:    false,
		Users:      []string{"mark"},
		Groups:     []string{"bar"},
		Percentage: 20,
	}
	// Make sure the feature is not enabled
	assert.False(t, f.IsEnabled())

	assert.True(t, f.GroupHasAccess("bar"))
	assert.False(t, f.GroupHasAccess("baz"))

	f.Groups = []string{"bar", "baz"}
	assert.True(t, f.GroupHasAccess("baz"))

	f.Enabled = true
	assert.True(t, f.GroupHasAccess("klm"))

	f.Groups = []string{}
	f.Percentage = 100
	f.Enabled = false
	assert.True(t, f.GroupHasAccess("test"))
}

func TestUserHasAccess(t *testing.T) {
	f := FeatureFlag{
		Key:        "foo",
		Enabled:    false,
		Users:      []string{"mark"},
		Groups:     []string{},
		Percentage: 20,
	}
	// Make sure the feature is not enabled
	assert.False(t, f.IsEnabled())

	assert.True(t, f.UserHasAccess("mark"))
	assert.False(t, f.UserHasAccess("jane"))

	f.Users = []string{"mark", "polly"}
	assert.True(t, f.UserHasAccess("polly"))

	f.Enabled = true
	assert.True(t, f.UserHasAccess("tod"))

	f.Users = []string{}
	f.Percentage = 100
	f.Enabled = false
	assert.True(t, f.UserHasAccess("tod"))
}
